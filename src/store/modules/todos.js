import axios from 'axios';

//this is the state/objects/data
const state = {
  todos: []
};

//these are the functions that returns the state
const getters = {
  allTodos: (state) => state.todos
};

//this will apply logic to the state, fetch data from API, etc.
const actions = {
  async fetchTodos({ commit }) { //Commit is one of the default parameters in action used to commit a mutation, because we can't access mutations directly
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
    commit('setTodos', res.data); //This is how we access mutations and pass a parameters, 1st is the mutation we wanna call, second is what we wanna pass
  },
  async addTodo({ commit }, title) {
    const res = await axios.post('https://jsonplaceholder.typicode.com/todos', { title, completed: false })
    commit('newTodo', res.data);
  },
  async deleteTodo({ commit }, id) {  
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    commit('removeTodo', id);
  },
  async filterTodos({ commit }, e) {
    const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
    const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
    commit('setTodos', res.data);
  },
  async updateTodo({ commit }, updatedTodo) {
    const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo);
    commit('updateTodo', res.data);
  }
};

//this will update the state
const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) => state.todos = state.todos.filter(t => t.id !== id),
  updateTodo: (state, updatedTodo) => {
    const index = state.todos.findIndex(t => t.id === updatedTodo.id);

    if(index !== -1) {
      state.todos.splice(index, 1, updatedTodo)
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}