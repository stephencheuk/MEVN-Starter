<template v-slot:bottom="scope">
  {{ JSON.stringify(scope) }}
  <div style="flex:1">
    <div style="display: flex; align-items: center">
      <div style="flex:1">23</div>
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


<script>
export default {
  data() {
    return {
      content: 132
    }
  }
}
</script>
