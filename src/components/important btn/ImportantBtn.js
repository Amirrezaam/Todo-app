import React from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchTodos, fetchTodosRequest } from '../../redux/todos/todosActions';
import { updateTodo } from '../../service/api';

export default function ImportantBtn({ todo, id, users }) {

    const dispatch = useDispatch();

    const importantTodo = () => {

        let updatedTodo = {
            ...todo,
            important: !todo.important
        }

        let userId = Object.keys(users).find(key => key == localStorage.getItem("user"));

        dispatch(fetchTodosRequest());

        updateTodo(userId, id, updatedTodo)
            .then(res => {
                dispatch(fetchTodos());
            })
            .catch(err => { })
    }

    return (
        <>
            <button onClick={importantTodo} className="text-[#845EC2] mr-2">
                {
                    todo.important
                        ?
                        <StarIcon />
                        :
                        <StarBorderIcon />
                }
            </button>
        </>
    )
}
