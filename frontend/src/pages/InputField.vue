<template>
  <q-page class="flex flex-center">
    <div>
      Title:
      <q-input
        v-model="inputtext"
        _filled
        dense
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const inputtext = ref('sample')
    return { inputtext }
  }
})
</script>
