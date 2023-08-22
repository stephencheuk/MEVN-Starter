<template>
  <div class="todo">
    Todos Here
    {{ state.name }}
    <table align="center" border="1" width="300" cellpadding="4" cellspacing="0">
      <tr v-for="item in state.todos" :key="item.author">
        <td>
          {{ item.author }}
        </td>
        <td>
          {{ item.todo }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import todocrud from '../modules/todocrud'
import { onMounted } from 'vue'

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  // name: 'HomeView',
  // components: {
  //   // HelloWorld
  // }
  setup() {
    // const state = reactive({
    //   name: 'Stephen',
    //   todos: {}
    // })

    // function GetAll() {
    //   fetch(`http://localhost:8000/api/todos`)
    //     .then(res => res.json())
    //     .then(data => {
    //       state.todos = data
    //       // debugger
    //     });
    // }
    // onMounted(()=>GetAll());
    // return { state, GetAll };
    
    const { state, GetAllTodos } = todocrud();
    onMounted(()=>GetAllTodos());
    return { state, GetAllTodos };
    
  }
}
</script>

<style lang="scss" scoped>

</style>
