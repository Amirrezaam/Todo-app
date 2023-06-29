import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux';
import { fetchTodos, fetchTodosRequest } from '../../redux/todos/todosActions';
import DeleteBtn from '../delete btn/DeleteBtn'
import EditBtn from '../edit btn/EditBtn'
import ImportantBtn from '../important btn/ImportantBtn';

export default function Task({ todo, id, i, users }) {

    const dispatch = useDispatch();

    const completeToggle = (id, todo) => {

        let updatedTodo = {
            ...todo,
            completed: !todo.completed
        }

        let userId;

        userId = Object.keys(users).find(key => key == localStorage.getItem("user"));

        dispatch(fetchTodosRequest());

        axios.put(`${process.env.REACT_APP_USER_BASE_URL}/users/${userId}/todos/${id}.json`, updatedTodo)
            .then(res => {
                dispatch(fetchTodos());
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div
            className={`todo relative w-full mt-7 p-3 flex items-center justify-between`}
        >
            <span className={`absolute bottom-0 left-0 w-full h-[2px] ${todo.completed ? "bg-[#00C9A7]" : "bg-[#B0A8B9]"}`}></span>
            <div className="flex items-center">
                <input
                    className="accent-[#00C9A7]"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => completeToggle(id, todo)}
                />
                <span
                    className={`ml-2 ${todo.completed ? "text-[#00C9A7]" : "text-[#B0A8B9]"}`}
                >
                    {i + 1} - <strong>{todo.todoText}</strong>
                </span>
            </div>
            <div className="flex items-center">
                <ImportantBtn users={users} todo={todo} id={id} />
                <DeleteBtn users={users} todo={todo} id={id} />
                <EditBtn users={users} todo={todo} id={id} />
            </div>
        </div>
    )
}
