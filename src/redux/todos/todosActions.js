import axios from "axios"

const fetchTodosRequest = () => {
    return {
        type: "FETCH_TODOS_REQUEST"
    }
}

const fetchTodosSuccess = todos => {
    return {
        type: "FETCH_TODOS_SUCCESS",
        payload: todos
    }
}

const fetchTodosFailed = err => {
    return {
        type: "FETCH_TODOS_FAILED",
        payload: err
    }
}

const fetchTodos = () => {
    return (dispatch) => {
        dispatch(fetchTodosRequest());

        let userId;

        axios.get(`${process.env.REACT_APP_USER_BASE_URL}/users.json`)
            .then(res => {
                userId = Object.keys(res.data).find(key => key == localStorage.getItem("user"));
                axios.get(`${process.env.REACT_APP_USER_BASE_URL}/users/${userId}/todos.json`)
                    .then(response => {
                        dispatch(fetchTodosSuccess(response.data));
                    }).catch(err => {
                        dispatch(fetchTodosFailed(err.message))
                    })
            })
    }
}

export {
    fetchTodosRequest,
    fetchTodosSuccess,
    fetchTodosFailed,
    fetchTodos
};