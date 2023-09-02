<template>
  <div class="row justify-center">
    <div class="q-pa-md q-gutter-sm row">
      <q-btn
        no-caps
        class="button"
        style="margin: 2px;"
        @click="$emit('today')"
      >
        Today
      </q-btn>
      <q-btn
        no-caps
        class="button"
        style="margin: 2px;"
        @click="$emit('prev')"
      >
      {{ props.prevText }}
      </q-btn>
      <q-btn
        no-caps
        class="button"
        style="margin: 2px;"
        @click="$emit('next')"
      >
        {{ props?.nextText }}
      </q-btn>
    </div>
  </div>
</template>

<script>

import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    nextText: {
      type: String,
      default: `Next >`
    },
    prevText: {
      type: String,
      default: `< Prev`
    },
  },
  setup (props) {
    return {
      props
    }
  }
})

</script>
