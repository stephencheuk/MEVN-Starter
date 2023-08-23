<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 100%">
      <q-card
        flat
        _bordered
      >
        <q-tabs
          v-model="tab"
          inline-label
          class="bg-white text-teal"
        >
          <q-tab name="info" icon="mail" label="Staff Info." />
          <q-tab name="nopay" icon="alarm" label="No Pay Leave" />
          <q-tab name="annlv" icon="movie" label="Annual Leave" />
          <q-tab name="sicklv" icon="movie" label="Sick Leave" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="info" class="rounded-borders">
            <div>
              <div class="text-h6">Staff Info</div>
              <q-form></q-form>
            </div>
          </q-tab-panel>

          <q-tab-panel name="nopay">
            <NoPayLeaveList />
          </q-tab-panel>

          <q-tab-panel name="annlv">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="sicklv">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import NoPayLeaveList from './DBDataTableNoPayLeave.vue'

export default {
  components: {
    NoPayLeaveList
  },
  setup () {
    return {

      tab: ref('mails')
    }
  }
}
</script>
