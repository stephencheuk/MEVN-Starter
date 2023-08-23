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

    <div style="display: flex; gap:4px; flex-direction: row-reverse; justify-content: center;">
    <div style="flex:1">
      <fieldset>
        <legend>Header:</legend>
        <fieldset>
          <legend>Customize:</legend>
          <div><label>Header: <q-checkbox v-model="ctrl_header" /></label></div>
        </fieldset>
        <fieldset>
          <legend>Row:</legend>
          <div><label>Right: <q-checkbox v-model="ctrl_header_right" /></label></div>
          <div><label>Selected: 
            <q-checkbox v-model="ctrl_header_selected" @click="clickAllSelect"/>
          </label></div>
        </fieldset>
      </fieldset>
      <fieldset>
        <legend>Body:</legend>
          <fieldset>
            <legend>Data Top:</legend>
            <div><label>Top: <q-checkbox v-model="ctrl_top_row" /></label></div>
          </fieldset>
          <fieldset>
            <legend>Data Row:</legend>
            <div><label>Bottom: <q-checkbox v-model="ctrl_bottom_row" /></label></div>
          </fieldset>
        </fieldset>
      <fieldset>
      <legend>Bottom:</legend>
        <fieldset>
          <legend>Preset:</legend>
            <div><label>Row Per Page Text: <input type="text" v-model="txt_rpp"></label></div>
        </fieldset>
        <fieldset>
          <legend>Customize:</legend>
          <div><label>Customize Bottom Row: <q-checkbox v-model="ctrl_bottom" /></label></div>
        </fieldset>
        <fieldset>
          <legend>Data:</legend>
          <div><label>No Data: <q-checkbox v-model="ctrl_bottom_nodata" /></label></div>
        </fieldset>
      </fieldset>
    </div>
    <q-table
      ref="table"
      style="flex:4"
      title="Treats"
      :rows="ctrl_bottom_nodata ? []:tableData"
      :columns="columns"
      :separator="separator"
      :pagination1="pagination"
      dense
      row-key="col1"
      selection="multiple"
      v-model:selected="selected"
      
      :selectedRowsLabel="func_selected"
      :rowsPerPageLabel="txt_rpp"
      :rowsPerPageOptions="[20, 50, 100]"
      
      >
      <template v-slot:top v-if="ctrl_header"><div class="q-table__title">我是 header 13</div></template>
      <!-- <template v-slot:top-left><div><h5 style="margin:2px">Table Name</h5></div></template> -->
      <template v-slot:top-right v-if="ctrl_header_right"><div>Action Button Here</div></template>
      <template v-slot:top-selection><div>我是 header 17</div></template>

      <!-- Table Header -->
      <!-- <template v-slot:header><div>我是 header 6</div></template>     -->
      <!-- <template v-slot:header-cell><div>我是 header 7</div></template>     -->
      <!-- <template v-slot:header-selection><div>我是 header 8</div></template>     -->

      <!-- Table Body Data -->
      <!-- <template v-slot:body><div>我是 header 1.1</div></template>     -->
      <!-- <template v-slot:body-cell><div>我是 header 2</div></template>     -->
      <!-- <template v-slot:body-selection><div>我是 header 3</div></template> -->

      <template v-slot:bottom="scope" v-if="ctrl_bottom">
        <div style="flex:1">
          <div style="display: flex; align-items: center">
            <div style="flex:1">{{val_selected}}</div>
            <div style="display: flex; align-items: center; gap: 4px">
              <div style="display: flex; align-items: center; gap: 4px">
                <div>{{txt_rpp}} : </div>
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
      </template>

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

      <template v-slot:top-row v-if="ctrl_top_row">
        <q-tr :props="props">
            <q-td></q-td>
            <q-td>A</q-td>
            <q-td>B</q-td>
            <q-td style="text-align:center">C</q-td>
            <q-td style="text-align:center">D</q-td>
            <q-td style="text-align:center">E</q-td>
            <q-td style="text-align:center">F</q-td>
            <q-td style="text-align:center">G</q-td>
        </q-tr>
      </template>
      <template v-slot:bottom-row v-if="ctrl_bottom_row">
        <q-tr :props="props">
            <q-td></q-td>
            <q-td>A</q-td>
            <q-td>B</q-td>
            <q-td style="text-align:center">C</q-td>
            <q-td style="text-align:center">D</q-td>
            <q-td style="text-align:center">E</q-td>
            <q-td style="text-align:center">F</q-td>
            <q-td style="text-align:center">G</q-td>
        </q-tr>
      </template>



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
  </div>
  </q-page>
</template>

<script>
// import Pagination from "../components/Pagination";
// import SlotBottom from "./TableAdvanceView/SlotBottom"
import { ref } from "vue";

const theData = [
    { col1: 'a1', col2: 'a2', col3: 'a3', col4: 'a4', col5: 'a5', col6: 'a6', col7: 'a7' },
    { col1: 'b1', col2: 'b2', col3: 'b3', col4: 'b4', col5: 'b5', col6: 'b6', col7: 'b7' },
    { col1: 'c1', col2: 'c2', col3: 'c3', col4: 'c4', col5: 'c5', col6: 'c6', col7: 'c7' },
    { col1: 'd1', col2: 'd2', col3: 'd3', col4: 'd4', col5: 'd5', col6: 'd6', col7: 'd7' },
    { col1: 'e1', col2: 'e2', col3: 'e3', col4: 'e4', col5: 'e5', col6: 'e6', col7: 'e7' },
    { col1: 'f1', col2: 'f2', col3: 'f3', col4: 'f4', col5: 'f5', col6: 'f6', col7: 'f7' },
  ]

  let table = ref()

export default {
  // name: 'PageName',
  // components: { SlotBottom, },
  methods:{
    onChangeSelect (e) {
      if(e.added){
        this.selected.push({"col1": e.keys[0]});
      }
      console.log('details: ', e, this.selected.length);
      // parse details and make a request.... 
    },
    clickAllSelect (val) {
      console.log('clickAllSelect', val, table.value);
    //   this.checkAll = !!val
    //   if (val) {
    //     this.data.forEach(item => {
    //       this.selected.push(item)
    //     })
    //   } else {
    //     // 实现清空已选中的效果
    //     // this.$refs.table.clearSelection() // 使用clearSelection方法 实现清空
    //     this.selected = []  // 直接赋值为[] 实现清空
    //   }
    },
  },
  data () {
    return {
      table,
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

      func_selected: a => console.log(a),
      ctrl_header: false,
      ctrl_header_right: false,
      ctrl_header_selected: false,

      ctrl_top_row: false,

      ctrl_bottom: false,
      ctrl_bottom_nodata: false,
      ctrl_bottom_row: false,

      txt_rpp: '每頁項目數量',

      current: 3,
      tableData: theData,
      theData,
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