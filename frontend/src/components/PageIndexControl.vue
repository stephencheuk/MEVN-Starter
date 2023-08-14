<template v-slot:pagination="scope">

  {{ JSON.stringify(scope) }}
  <q-btn
    v-if="scope.pagesNumber > 2"
    icon="first_page"
    color="grey-8"
    round
    dense
    flat
    :disable="scope.isFirstPage"
    @click="scope.firstPage"
  />

  <q-btn
    icon="chevron_left"
    color="grey-8"
    round
    dense
    flat
    :disable="scope.isFirstPage"
    @click="scope.prevPage"
  />

  <q-btn
    icon="chevron_right"
    color="grey-8"
    round
    dense
    flat
    :disable="scope.isLastPage"
    @click="scope.nextPage"
  />

  <q-btn
    v-if="scope.pagesNumber > 2"
    icon="last_page"
    color="grey-8"
    round
    dense
    flat
    :disable="scope.isLastPage"
    @click="scope.lastPage"
  />
</template>