import axios from "axios";

export async function updateUser(id, user) {
    return await axios.put(`${process.env.REACT_APP_USER_BASE_URL}users/${id}.json`, user)
}

export async function createUser(user) {
    return await axios.post(`${process.env.REACT_APP_USER_BASE_URL}/users.json`, user)
}

export async function createTodo(userId, todo) {
    return await axios.post(`${process.env.REACT_APP_USER_BASE_URL}/users/${userId}/todos.json`, todo)
}

export async function deleteTodo(userId, todoId) {
    return await axios.delete(`${process.env.REACT_APP_USER_BASE_URL}/users/${userId}/todos/${todoId}.json`)
}

export async function updateTodo(userId, todoId, updatedTodo) {
    return await axios.put(`${process.env.REACT_APP_USER_BASE_URL}/users/${userId}/todos/${todoId}.json`, updatedTodo)
}