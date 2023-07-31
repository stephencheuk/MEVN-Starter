import { ref } from "vue";

const getTodos = () => {
  const state = ref({
    todos: {},
  });

  const GetAllTodos = async () => {
    try {
      await fetch(`http://localhost:8000/api/todos`)
        .then((res) => res.json())
        .then((data) => {
          state.value.todos = data;
          // debugger
        });
    } catch (err) {
      console.log(err);
    }
  };

  return { state, GetAllTodos };
};

export default getTodos;
