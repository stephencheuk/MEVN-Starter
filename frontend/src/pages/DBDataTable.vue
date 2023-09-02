<template>
  <div class="q-pa-md col-grow column">
    <q-table
      class="sticky-header"
      flat
      bordered
      dense
      ref="tableRef"
      title="DB Data Table (Employee)"
      :rows="rows"
      :columns="columns"
      row-key="index"
      :rows-per-page-options="[0, 10, 20, 50, 100]"
      v-model:pagination="pagination"
      :loading="loading"
      :filter="filter"
      binary-state-sort
      @request="onRequest"
      @row-click="(e, r)=>console.log(this.$router.push(`${this.$route.path}/edit/${r._id}`))
      ">
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

<style lang="sass">
.sticky-header
  /* height or max-height is important */
  max-height: 100vh
  flex: 1 0 0px

  .q-table__middle
    flex: 1 0 0px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  tbody tr:nth-child(even)
    background-color: #f0f0f0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

</style>

<script>
import { ref, onMounted } from 'vue'

const columns = [
  {
    name: 'index',
    label: '#',
    field: 'index',
    headerStyle: "width: 10%; text-align: center",
    style: "text-align: center"
  },
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    // field: row => row.name,
    // format: val => `${val}`,
    sortable: true,
    headerStyle: "width: 60%",
  },
  {
    name: 'salary',
    align: 'right',
    label: 'Salary',
    field: 'salary',
    sortable: true,
    format: val => val.toLocaleString('en-hk', { style: 'currency', currency: 'HKD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace("$", "$ "),
    headerStyle: "width: 30%",
  }
  // { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  // { name: 'carbs', label: 'Carbs (g)', field: 'carbs', sortable: true },
  // { name: 'protein', label: 'Protein (g)', field: 'protein', sortable: true },
  // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium', sortable: true },
  // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

// const originalRows = [
//   { id: 1, name: 'Frozen Yogurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, sodium: 87, calcium: '14%', iron: '1%' },
//   { id: 2, name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, sodium: 129, calcium: '8%', iron: '1%' },
//   { id: 3, name: 'Eclair', calories: 262, fat: 16.0, carbs: 23, protein: 6.0, sodium: 337, calcium: '6%', iron: '7%' },
//   { id: 4, name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, sodium: 413, calcium: '3%', iron: '8%' },
//   { id: 5, name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9, sodium: 327, calcium: '7%', iron: '16%' },
//   { id: 6, name: 'Jelly bean', calories: 375, fat: 0.0, carbs: 94, protein: 0.0, sodium: 50, calcium: '0%', iron: '0%' },
//   { id: 7, name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0, sodium: 38, calcium: '0%', iron: '2%' },
//   { id: 8, name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5, sodium: 562, calcium: '0%', iron: '45%' },
//   { id: 9, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%' },
//   { id: 10, name: 'KitKat', calories: 518, fat: 26.0, carbs: 65, protein: 7, sodium: 54, calcium: '12%', iron: '6%' },
//   { id: 11, name: 'Frozen Yogurt-1', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, sodium: 87, calcium: '14%', iron: '1%' },
//   { id: 12, name: 'Ice cream sandwich-1', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, sodium: 129, calcium: '8%', iron: '1%' },
//   { id: 13, name: 'Eclair-1', calories: 262, fat: 16.0, carbs: 23, protein: 6.0, sodium: 337, calcium: '6%', iron: '7%' },
//   { id: 14, name: 'Cupcake-1', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, sodium: 413, calcium: '3%', iron: '8%' },
//   { id: 15, name: 'Gingerbread-1', calories: 356, fat: 16.0, carbs: 49, protein: 3.9, sodium: 327, calcium: '7%', iron: '16%' },
//   { id: 16, name: 'Jelly bean-1', calories: 375, fat: 0.0, carbs: 94, protein: 0.0, sodium: 50, calcium: '0%', iron: '0%' },
//   { id: 17, name: 'Lollipop-1', calories: 392, fat: 0.2, carbs: 98, protein: 0, sodium: 38, calcium: '0%', iron: '2%' },
//   { id: 18, name: 'Honeycomb-1', calories: 408, fat: 3.2, carbs: 87, protein: 6.5, sodium: 562, calcium: '0%', iron: '45%' },
//   { id: 19, name: 'Donut-1', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%' },
//   { id: 20, name: 'KitKat-1', calories: 518, fat: 26.0, carbs: 65, protein: 7, sodium: 54, calcium: '12%', iron: '6%' },
//   { id: 21, name: 'Frozen Yogurt-2', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, sodium: 87, calcium: '14%', iron: '1%' },
//   { id: 22, name: 'Ice cream sandwich-2', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, sodium: 129, calcium: '8%', iron: '1%' },
//   { id: 23, name: 'Eclair-2', calories: 262, fat: 16.0, carbs: 23, protein: 6.0, sodium: 337, calcium: '6%', iron: '7%' },
//   { id: 24, name: 'Cupcake-2', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, sodium: 413, calcium: '3%', iron: '8%' },
//   { id: 25, name: 'Gingerbread-2', calories: 356, fat: 16.0, carbs: 49, protein: 3.9, sodium: 327, calcium: '7%', iron: '16%' },
//   { id: 26, name: 'Jelly bean-2', calories: 375, fat: 0.0, carbs: 94, protein: 0.0, sodium: 50, calcium: '0%', iron: '0%' },
//   { id: 27, name: 'Lollipop-2', calories: 392, fat: 0.2, carbs: 98, protein: 0, sodium: 38, calcium: '0%', iron: '2%' },
//   { id: 28, name: 'Honeycomb-2', calories: 408, fat: 3.2, carbs: 87, protein: 6.5, sodium: 562, calcium: '0%', iron: '45%' },
//   { id: 29, name: 'Donut-2', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%' },
//   { id: 30, name: 'KitKat-2', calories: 518, fat: 26.0, carbs: 65, protein: 7, sodium: 54, calcium: '12%', iron: '6%' },
//   { id: 31, name: 'Frozen Yogurt-3', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, sodium: 87, calcium: '14%', iron: '1%' },
//   { id: 32, name: 'Ice cream sandwich-3', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, sodium: 129, calcium: '8%', iron: '1%' },
//   { id: 33, name: 'Eclair-3', calories: 262, fat: 16.0, carbs: 23, protein: 6.0, sodium: 337, calcium: '6%', iron: '7%' },
//   { id: 34, name: 'Cupcake-3', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, sodium: 413, calcium: '3%', iron: '8%' },
//   { id: 35, name: 'Gingerbread-3', calories: 356, fat: 16.0, carbs: 49, protein: 3.9, sodium: 327, calcium: '7%', iron: '16%' },
//   { id: 36, name: 'Jelly bean-3', calories: 375, fat: 0.0, carbs: 94, protein: 0.0, sodium: 50, calcium: '0%', iron: '0%' },
//   { id: 37, name: 'Lollipop-3', calories: 392, fat: 0.2, carbs: 98, protein: 0, sodium: 38, calcium: '0%', iron: '2%' },
//   { id: 38, name: 'Honeycomb-3', calories: 408, fat: 3.2, carbs: 87, protein: 6.5, sodium: 562, calcium: '0%', iron: '45%' },
//   { id: 39, name: 'Donut-3', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%' },
//   { id: 40, name: 'KitKat-3', calories: 518, fat: 26.0, carbs: 65, protein: 7, sodium: 54, calcium: '12%', iron: '6%' }
// ]

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
      rowsPerPage: 10,
      rowsNumber: 10
    })

    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    const fetchFromServer = async (startRow, count, filter, sortBy, descending) => {
      console.log(startRow, count, filter, sortBy, descending)
      const result = await fetch(`/api/employee?search=${filter}&order=${descending}&sortBy=${sortBy}&from=${startRow}&limit=${count}`)
        .then(response => response.json())
      // .then(json => console.log(json))
      result.data.forEach((el, i) => {
        el.index = startRow + i + 1;
      })
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
