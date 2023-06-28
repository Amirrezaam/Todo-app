const fetchTodos = () => {
    let t = _.isEqual(state, todos)
    console.log("state => ", state);
    console.log("todos => ", todos);
    console.log(!t);
    // if (!t || state === null) {
    dispatch(fetchTodosRequest());
    axios.get("https://todo-app-8a08e-default-rtdb.firebaseio.com/todos.json")
        .then(response => {
            dispatch(fetchTodosSuccess(response.data));
            // todos.map(todo => console.log(todo))
        }).catch(err => {
            dispatch(fetchTodosFailed(err.message))
        })
    // }
}