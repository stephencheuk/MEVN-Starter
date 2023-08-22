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
      dense
      row-key="col1"
      selection="multiple"
      v-model:selected="selected"
      >
      <!-- <template v-slot:top><div v-show="s13">我是 header 13</div></template> -->
      <template v-slot:top-left><div v-show="s14">我是 header 14</div></template>
      <template v-slot:top-right><div v-show="s15">我是 header 15</div></template>
      <!-- <template v-slot:top-row><div v-show="s16">我是 header 16</div></template> -->
      <!-- <template v-slot:top-selection><div v-show="s17">我是 header 17</div></template> -->

      <!-- Table Header -->
      <!-- <template v-slot:header><div v-show="s6">我是 header 6</div></template>     -->
      <!-- <template v-slot:header-cell><div v-show="s7">我是 header 7</div></template>     -->
      <!-- <template v-slot:header-selection><div v-show="s8">我是 header 8</div></template>     -->

      <!-- Table Body Data -->
      <!-- <template v-slot:body><div v-show="s1">我是 header 1.1</div></template>     -->
      <!-- <template v-slot:body-cell><div v-show="s2">我是 header 2</div></template>     -->
      <!-- <template v-slot:body-selection><div v-show="s3">我是 header 3</div></template>     -->

      <template v-slot:bottom><div v-show="s4">我是 header 4</div></template>    
      <template v-slot:bottom-row><div v-show="s5">我是 header 5</div></template>    
      
      <template v-slot:item><div v-show="s9">我是 header 9</div></template>    
      <template v-slot:loading><div v-show="s10">我是 header 10</div></template>    

      <template v-slot:no-data><div v-show="s11">NO DATA MESSAGE HERE</div></template>    

      <template v-slot:pagination><div v-show="s12">我是 header 12</div></template>

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
      tableData: [
        {
          col1: 'x1', col2: 'x2', col3: 'x3', col4: 'x4', col5: 'x5', col6: 'x6', col7: 'x7'
        },
        {
          col1: 'y1', col2: 'y2', col3: 'y3', col4: 'y4', col5: 'y5', col6: 'y6', col7: 'y7'
        }
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
    }
  }
}
</script>