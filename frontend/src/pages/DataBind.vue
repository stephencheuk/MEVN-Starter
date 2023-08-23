<template>

  <div><b>v-for</b></div>
  <div>{{ JSON.stringify(items, null) }}</div>
  <ul>
    <li v-for="(item, key, index) in items" :key="item.message">
      <i>{{ key }} - {{ index }} - {{ item.message }}</i>
    </li>
  </ul>

  <div><br/><b>bind</b></div>
  <input v-model="dynamicId">
  <div>{{ dynamicId }}</div>
  <div v-bind="myAttr">{{ myAttr }}</div>

  <div><br/><b>disabled</b></div>
  <input type="radio" v-model="truefalse" value="1"> True
  <input type="radio" v-model="truefalse" value=""> False
  <div :disabled="truefalse == 1 ? truefalse : null ">!! {{truefalse}} !!</div>

</template>

<script>
import { ref } from 'vue';

const items = ref([{ message: 'Foo' }, { message: 'Bar' }]);
const dynamicId = ref('');
const truefalse = ref(true);

const myAttr = ref({
  id: 'container',
  class: 'wrapper',
  style: 'color: red'
});

export default {

  methods: {
  },

  data () {
    return {
      myAttr,
      dynamicId,
      truefalse,
      items,
    }
  }

}
</script>
