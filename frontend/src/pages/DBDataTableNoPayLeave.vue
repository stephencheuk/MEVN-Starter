<template>
  <div class="q-pa-md">
    <q-table flat bordered ref="tableRef" title="Treats" :rows="rows" :columns="columns" row-key="id"
      :rows-per-page-options="[0, 20, 50, 100]" v-model:pagination="pagination" :loading="loading" :filter="filter"
      binary-state-sort @request="onRequest" @row-click="(e, r)=>console.log(this.$router.push(`${this.$route.path}/edit/${r._id}`))">
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

    </q-table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    // field: row => row.name,
    // format: val => `${val}`,
    sortable: true
  },
  {
    name: 'salary',
    align: 'right',
    label: 'Salary',
    field: 'salary',
    sortable: true,
    format: val => val.toLocaleString('en-hk', { style: 'currency', currency: 'HKD', minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
]

export default {
  setup () {
    const tableRef = ref()
    const rows = ref([])
    const filter = ref('')
    const loading = ref(false)
    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 5,
      rowsNumber: 10
    })

    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    const fetchFromServer = async (startRow, count, filter, sortBy, descending) => {
      console.log(startRow, count, filter, sortBy, descending)
      const result = await fetch(`http://localhost:8000/api/leaves?search=${filter}&order=${descending}&sortBy=${sortBy}&from=${startRow}&limit=${count}`)
        .then(response => response.json())
      // .then(json => console.log(json))
      console.log(result)
      return result

      // const data = filter
      //   ? originalRows.filter(row => row.name.includes(filter))
      //   : originalRows.slice()

      // // handle sortBy
      // if (sortBy) {
      //   const sortFn = sortBy === 'desc'
      //     ? (descending
      //         ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
      //         : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
      //       )
      //     : (descending
      //         ? (a, b) => (parseFloat(b[sortBy]) - parseFloat(a[sortBy]))
      //         : (a, b) => (parseFloat(a[sortBy]) - parseFloat(b[sortBy]))
      //       )
      //   data.sort(sortFn)
      // }

      // return data.slice(startRow, startRow + count)
    }

    // emulate 'SELECT count(*) FROM ...WHERE...'
    // function getRowsNumberCount(filter) {
    //   if (!filter) {
    //     return originalRows.length
    //   }
    //   let count = 0
    //   originalRows.forEach(treat => {
    //     if (treat.name.includes(filter)) {
    //       ++count
    //     }
    //   })
    //   return count
    // }

    const onRequest = (props) => {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter

      loading.value = true

      // emulate server
      setTimeout(async () => {
        // update rowsCount with appropriate value
        // pagination.value.rowsNumber = getRowsNumberCount(filter)

        // get all rows if "All" (0) is selected
        const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage

        // fetch data from "server"
        // const returnedData = fetchFromServer(startRow, fetchCount, filter, sortBy, descending)
        const returnedData = await fetchFromServer(startRow, fetchCount, filter, sortBy, descending)

        pagination.value.rowsNumber = returnedData?.total || 0

        // clear out existing data and add new
        rows.value.splice(0, rows.value.length, ...(returnedData?.data || []))
        console.log(returnedData.data)

        // don't forget to update local pagination object
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending

        // ...and turn of loading indicator
        loading.value = false
      }, 1500)
    }

    onMounted(() => {
      // get initial data from server (1st page)
      tableRef.value.requestServerInteraction()
    })

    return {
      tableRef,
      filter,
      loading,
      pagination,
      columns,
      rows,

      onRequest
    }
  }
}
</script>
