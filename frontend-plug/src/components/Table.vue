<template>

  <q-table
    :columns="columns"
  >

  </q-table>

</template>

<script setup>
columns: [ // array of Objects
    // column Object definition
    {
      // unique id
      // identifies column
      // (used by pagination.sortBy, "body-cell-[name]" slot, ...)
      name: 'desc',

      // label for header
      label: 'Dessert (100g serving)',

      // row Object property to determine value for this column
      field: 'name',
      // OR field: row => row.some.nested.prop,

      // (optional) if we use visible-columns, this col will always be visible
      required: true,

      // (optional) alignment
      align: 'left',

      // (optional) tell QTable you want this column sortable
      sortable: true,

      // (optional) compare function if you have
      // some custom data or want a specific way to compare two rows
      sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
      // function return value:
      //   * is less than 0 then sort a to an index lower than b, i.e. a comes first
      //   * is 0 then leave a and b unchanged with respect to each other, but sorted with respect to all different elements
      //   * is greater than 0 then sort b to an index lower than a, i.e. b comes first

      // (optional) override 'column-sort-order' prop;
      // sets column sort order: 'ad' (ascending-descending) or 'da' (descending-ascending)
      sortOrder: 'ad', // or 'da'

      // (optional) you can format the data with a function
      format: (val, row) => `${val}%`,
      // one more format example:
      // format: val => val
      //   ? /* Unicode checkmark checked */ "\u2611"
      //   : /* Unicode checkmark unchecked */ "\u2610",

      // body td:
      style: 'width: 500px',
      // or as Function --> style: row => ... (return String/Array/Object)
      classes: 'my-special-class',
      // or as Function --> classes: row => ... (return String)

      // header th:
      headerStyle: 'width: 500px',
      headerClasses: 'my-special-class'
    },
    { name: 'calories', label: 'Calories', field: 'calories', sortable: true },
    { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
    { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
    { name: 'protein', label: 'Protein (g)', field: 'protein' },
    { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
    { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
    { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
  ]



</script>