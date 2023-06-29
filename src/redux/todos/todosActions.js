import axios from "axios"
import { fetchUsersFailed } from "../user/userActions"

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

        axios.get(`${process.env.REACT_APP_USER_BASE_URL}users.json`)
            .then(res => {
                if (res.data) {
                    userId = Object.keys(res.data).find(key => key == localStorage.getItem("user"));
                }
                axios.get(`${process.env.REACT_APP_USER_BASE_URL}/users/${userId}/todos.json`)
                    .then(response => {
                        dispatch(fetchTodosSuccess(response.data));
                    }).catch(err => {
                        dispatch(fetchTodosFailed(err.message))
                    })
            })
            .catch(err => {
                console.log("object");
                dispatch(fetchUsersFailed(err.message));
                dispatch(fetchTodosFailed(err.message));
            })
    }
}

export {
    fetchTodosRequest,
    fetchTodosSuccess,
    fetchTodosFailed,
    fetchTodos
};