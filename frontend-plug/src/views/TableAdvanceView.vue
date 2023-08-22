<template>
  <q-page padding>

    <q-option-group
      v-model="separator"
      inline
      class="q-mb-md"
      :options="[
        { label: 'Horizontal (default)', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
        { label: 'Cell', value: 'cell' },
        { label: 'None', value: 'none' },
      ]"
    />

    <div style="display: flex; gap: 4px">
      <label><input type="checkbox" @change="s1 = $event.target.checked"> Header 1</label>
      <label><input type="checkbox" @change="s2 = $event.target.checked"> Header 2</label>
      <label><input type="checkbox" @change="s3 = $event.target.checked"> Header 3</label>
      <label><input type="checkbox" @change="s4 = $event.target.checked"> Header 4</label>
      <label><input type="checkbox" @change="s5 = $event.target.checked"> Header 5</label>
    </div>

    <div style="display: flex; gap: 4px">
      <label><input type="checkbox" @change="s6 = $event.target.checked"> Header 6</label>
      <label><input type="checkbox" @change="s7 = $event.target.checked"> Header 7</label>
      <label><input type="checkbox" @change="s8 = $event.target.checked"> Header 8</label>
      <label><input type="checkbox" @change="s9 = $event.target.checked"> Header 9</label>
      <label><input type="checkbox" @change="s10 = $event.target.checked"> Header 10</label>
    </div>

    <div style="display: flex; gap: 4px">
      <label><input type="checkbox" @change="s11 = $event.target.checked"> Header 11</label>
      <label><input type="checkbox" @change="s12 = $event.target.checked"> Header 12</label>
      <label><input type="checkbox" @change="s13 = $event.target.checked"> Header 13</label>
      <label><input type="checkbox" @change="s14 = $event.target.checked"> Header 14</label>
      <label><input type="checkbox" @change="s15 = $event.target.checked"> Header 15</label>
      <label><input type="checkbox" @change="s16 = $event.target.checked"> Header 16</label>
      <label><input type="checkbox" @change="s17 = $event.target.checked"> Header 17</label>
    </div>

    <q-table
      title="Treats"
      :rows="tableData"
      :columns="columns"
      :separator="separator"
      :pagination1="pagination"
      dense
      row-key="col1"
      selection="multiple"
      v-model:selected="selected"

      :rowsPerPageLabel="'每頁項目數量'"
      :rowsPerPageOptions="[5, 10, 20, 50, 100]"
      
      >
      <!-- <template v-slot:top><div>我是 header 13</div></template> -->
      <!-- <template v-slot:top-left><div><h5 style="margin:2px">Table Name</h5></div></template> -->
      <template v-slot:top-right><div>Action Button Here</div></template>
      <!-- <template v-slot:top-row><div>我是 header 16</div></template> -->
      <template v-slot:top-selection><div>我是 header 17</div></template>

      <!-- Table Header -->
      <!-- <template v-slot:header><div>我是 header 6</div></template>     -->
      <!-- <template v-slot:header-cell><div>我是 header 7</div></template>     -->
      <!-- <template v-slot:header-selection><div>我是 header 8</div></template>     -->

      <!-- Table Body Data -->
      <!-- <template v-slot:body><div>我是 header 1.1</div></template>     -->
      <!-- <template v-slot:body-cell><div>我是 header 2</div></template>     -->
      <!-- <template v-slot:body-selection><div>我是 header 3</div></template> -->

      <!-- <template v-slot:bottom="scope">
        <div style="flex:1">
          <div style="display: flex; align-items: center">
            <div style="flex:1">23</div>
            <div style="display: flex; align-items: center; gap: 4px">
              <div style="display: flex; align-items: center; gap: 4px">
                <div>每頁項目數量 : </div>
                <div>
                  <q-select
                    dense
                    options-dense
                    borderless
                    optionsCover
                    v-model="scope.pagination.rowsPerPage"
                    :options="[5, 10, 20, 50, 100]"
                    />
                </div>
              </div>
              <div>
                <q-pagination
                  v-model="scope.pagination.page"
                  :max="scope.pagesNumber"
                  direction-links
                  boundary-links
                  icon-first="skip_previous"
                  icon-last="skip_next"
                  icon-prev="fast_rewind"
                  icon-next="fast_forward"
                  />
              </div>
            </div>
          </div>
        </div>
      </template> -->

      <!-- QTableSlots -->
      <!-- <template v-slot:loading><div>我是 header 10</div></template>     -->
      <!-- <template v-slot:item><div>我是 header 9</div></template>     -->
      <!-- <template v-slot:pagination="scope">
        {{ JSON.stringify(scope) }}
        <q-pagination
          v-model="scope.pagination.page"
          :max="scope.pagesNumber"
          direction-links
          boundary-links
          icon-first="skip_previous"
          icon-last="skip_next"
          icon-prev="fast_rewind"
          icon-next="fast_forward"
        />
      </template> -->
      <template v-slot:no-data><div>NO DATA MESSAGE HERE</div></template>    

      <!-- <template v-slot:bottom-row><div>Table Body Bottom</div></template>     -->
      



      <!-- <template v-slot:header="props">
        <q-tr :props="props">
            <q-th rowspan="2" >Sku</q-th>
            <q-th rowspan="2">Name</q-th>
            <q-th colspan="3" style="text-align:center">Sales</q-th>
            <q-th rowspan="2" style="text-align:center">Order</q-th>
            <q-th colspan="3" style="text-align:center">Before Order</q-th>
            <q-th colspan="3" style="text-align:center">After Order</q-th>
            <q-th colspan="3" style="text-align:center">Order</q-th>
        </q-tr>
        <q-tr :props="props">
            <q-th>Qty</q-th>
            <q-th>Count</q-th>
            <q-th>Daily</q-th>
            <q-th>Stock</q-th>
            <q-th>Days</q-th>
            <q-th>Date</q-th>
            <q-th>Stock</q-th>
            <q-th>Days</q-th>
            <q-th>Date</q-th>
            <q-th>Price</q-th>
            <q-th>Discount</q-th>
            <q-th>Total</q-th>
        </q-tr>
      </template> -->
    </q-table>
  </q-page>
</template>

<script>
// import Pagination from "../components/Pagination";

export default {
  // name: 'PageName',
  methods:{
    onChangeSelect (e) {
      if(e.added){
        this.selected.push({"col1": e.keys[0]});
      }
      console.log('details: ', e, this.selected.length);
      // parse details and make a request.... 
    },
  },
  data () {
    return {
      s1: false,
      s2: false,
      s3: false,
      s4: false,
      s5: false,
      s6: false,
      s7: false,
      s8: false,
      s9: false,
      s10: false,
      s12: false,
      s13: false,
      s14: false,
      s15: false,
      s16: false,
      s17: false,
      s18: false,
      s19: false,
      current: 3,
      tableData: [
        { col1: 'a1', col2: 'a2', col3: 'a3', col4: 'a4', col5: 'a5', col6: 'a6', col7: 'a7' },
        { col1: 'b1', col2: 'b2', col3: 'b3', col4: 'b4', col5: 'b5', col6: 'b6', col7: 'b7' },
        { col1: 'c1', col2: 'c2', col3: 'c3', col4: 'c4', col5: 'c5', col6: 'c6', col7: 'c7' },
        { col1: 'd1', col2: 'd2', col3: 'd3', col4: 'd4', col5: 'd5', col6: 'd6', col7: 'd7' },
        { col1: 'e1', col2: 'e2', col3: 'e3', col4: 'e4', col5: 'e5', col6: 'e6', col7: 'e7' },
        { col1: 'f1', col2: 'f2', col3: 'f3', col4: 'f4', col5: 'f5', col6: 'f6', col7: 'f7' },
      ],
      columns: [
        { name: 'col1', align: 'center', label: 'col1', field: 'col1', sortable: true },
        { name: 'col2', align: 'center', label: 'col2', field: 'col2', sortable: true },
        { name: 'col3', align: 'center', label: 'col3', field: 'col3', sortable: true },
        { name: 'col4', align: 'center', label: 'col4', field: 'col4', sortable: true },
        { name: 'col5', align: 'center', label: 'col5', field: 'col5', sortable: true },
        { name: 'col6', align: 'center', label: 'col6', field: 'col6', sortable: true },
        { name: 'col7', align: 'center', label: 'col7', field: 'col7', sortable: true }
      ],
      separator: 'cell',
      selected: [],
      // pagination: {
      //   sortBy: 'desc',
      //   descending: false,
      //   page: 2,
      //   rowsPerPage: 3
      //   // rowsNumber: xx if getting data from a server
      // },
    }
  }
}
</script>