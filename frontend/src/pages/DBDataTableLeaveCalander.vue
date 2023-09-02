<template>
  <div class="q-pa-md">
    <daykeep-calendar-month
      :start-date="Date('2018-02-01')"
      :event-array="someEventObject"
      :sunday-first-day-of-week="true"
      calendar-locale="fr"
      calendar-timezone="Europe/Paris"
      :allow-editing="false"
      :render-html="true"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { DaykeepCalendar } from '@daykeep/calendar-quasar'


const DateOpt = {
  timeZone: 'Asia/Hong_Kong',
  // weekday: 'numeric',
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}

const columns = [
  {
    id: 1,
    summary: 'Test event',
    description: 'Some extra info goes here',
    location: 'Office of the Divine Randomness, 1232 Main St., Denver, CO',
    start: {
      dateTime: '2018-02-16T14:00:00', // ISO 8601 formatted
      timeZone: 'America/New_York' // Timezone listed as a separate IANA code
    },
    end: {
      dateTime: '2018-02-16T16:30:00',
      timeZone: 'American/New_York'
    },
    color: 'positive',
    attendees: [
      {
        id: 5,
        email: 'somebody@somewhere.com',
        displayName: 'John Q. Public',
        organizer: false,
        self: false,
        resource: false
      }
    ]
  },
  {
    id: 2,
    summary: 'Test all-day event',
    description: 'Some extra info goes here',
    start: {
      date: '2018-02-16' // A date variable indicates an all-day event
    },
    end: {
      date: '2018-02-19'
    }
  },
    {
      id: 3,
      summary: 'Some other test event',
      description: 'Some extra info goes here',
      start: {
        dateTime: '2018-02-17T10:00:00+0500', // timezone embedded in dateTime
      },
      end: {
        dateTime: '2018-02-17T12:30:00+0500',
      },
    },
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
      const result = await fetch(`/api/leaves?search=${filter}&order=${descending}&sortBy=${sortBy}&from=${startRow}&limit=${count}`)
        .then(response => response.json())
      // .then(json => console.log(json))
      console.log(result)
      return result
    }

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
