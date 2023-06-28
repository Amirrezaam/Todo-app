import React from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchTodos } from '../../redux/todos/todosActions';

export default function ImportantBtn({ todo, id, users }) {

    const dispatch = useDispatch();

    const importantTodo = () => {

        let updatedTodo = {
            ...todo,
            important: !todo.important
        }

        let userId;

        if (users) {
            userId = Object.keys(users).find(key => key == localStorage.getItem("user"));
        }else{
            alert("Please try again !!!");
            return;
        }
        
        axios.put(`${process.env.REACT_APP_USER_BASE_URL}/users/${userId}/todos/${id}.json`, updatedTodo)
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
