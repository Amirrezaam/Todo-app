import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteTodo, fetchTodos, fetchTodosRequest } from '../../redux/todos/todosActions';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import Btn from '../btn/Btn';
import axios from 'axios';

export default function DeleteBtn({ todo, id, users }) {

    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();

    const deleteTodo = () => {

        let userId;

        if (users) {
            userId = Object.keys(users).find(key => key == localStorage.getItem("user"));
        }else{
            alert("Please try again !!!");
            return;
        }
        
        dispatch(fetchTodosRequest());

        axios.delete(`${process.env.REACT_APP_USER_BASE_URL}/users/${userId}/todos/${id}.json`)
            .then(res => {
                dispatch(fetchTodos());
                setOpenModal(false);
                alert("DONE !!!");
            })
            .catch(err => {
                setOpenModal(false);
                dispatch(fetchTodos());
                alert("TRY AGAIN !!!");
            })
    }

    useEffect(() => {
        const bodyStyle = document.body.style;
        openModal ? bodyStyle.overflowY = "hidden" : bodyStyle.overflowY = "auto";
    }, [openModal])

    return (
        <div>
            {
                openModal ?
                    <div
                        className={`w-full h-[100vh] fixed top-0 left-0 bg-black/50 flex items-center justify-center z-[9999]`}
                    >
                        <div className={`bg-[#4B4453] rounded-lg rounded-tr-lg p-6 relative`}>
                            <span className="absolute top-[-25px] left-[50%] translate-x-[-50%] w-[50px] h-[50px] rounded-full bg-inherit text-white flex items-center justify-center">
                                <DeleteForeverIcon sx={{ fontSize: "32px" }} />
                            </span>
                            <p className="text-white text-2xl my-4">Are you sure about delete?</p>
                            <p className="text-center text-gray-300 mb-4">{todo.todoText}</p>

                            <div className="flex items-center justify-center">
                                <Btn
                                    className="border-2 border-solid border-white text-white text-base mr-2"
                                    onClick={() => setOpenModal(false)}
                                    text="Cancel"
                                    icon={<CloseIcon />}
                                />

                                <Btn
                                    className="bg-[#C34A36] text-white text-base"
                                    onClick={() => deleteTodo()}
                                    icon={<DeleteIcon />}
                                    text="Delete"
                                />
                            </div>
                        </div>
                    </div>
                    : null
            }
            <button
                className="text-[#C34A36]"
                onClick={() => setOpenModal(true)}
            >
                <DeleteIcon />
            </button>
        </div>
    )
}
