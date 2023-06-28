import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { editTodo, fetchTodos } from '../../redux/todos/todosActions';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';
import "./editBtn.css"
import Btn from '../btn/Btn';
import axios from 'axios';

export default function EditBtn({ todo, id, users }) {

    const [editedValue, setEditedValue] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();

    const editTodo = () => {

        let updatedTodo = {
            ...todo,
            todoText: editedValue
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
                setOpenModal(false);
                alert("DONE !!!");
            })
            .catch(err => {
                setOpenModal(false);
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
                        className="w-full h-[100vh] fixed top-0 left-0 bg-black/50 flex items-center justify-center z-[9999]"
                    // style={{ top: window.scrollY + "px" }}
                    >
                        <div className="bg-[#4B4453] w-[90%] md:w-[50%] lg:w-[30%] rounded-lg rounded-tr-lg p-6 relative">
                            <span className="absolute top-[-25px] left-[50%] translate-x-[-50%] w-[50px] h-[50px] rounded-full bg-inherit text-white flex items-center justify-center">
                                <ModeEditIcon sx={{ fontSize: "32px" }} />
                            </span>
                            <input
                                className="block my-8 edit-input"
                                placeholder="Please edit task"
                                onChange={e => setEditedValue(e.target.value)}
                            />

                            <div className="flex items-center justify-center">
                                <Btn
                                    className="border-2 border-solid border-white text-white text-base mr-2"
                                    onClick={() => setOpenModal(false)}
                                    text="Cancel"
                                    icon={<CloseIcon />}
                                />

                                <Btn
                                    className="bg-[#F9F871] text-black text-base"
                                    // onClick={() => { dispatch(editTodo(todo, editedValue)); setOpenModal(false); setReRender(prev => !prev) }}
                                    onClick={() => editTodo()}
                                    text="Edit"
                                    icon={<BorderColorIcon />}
                                />
                            </div>
                        </div>
                    </div>
                    : null
            }
            <button
                className="text-[#F9F871] mx-2"
                onClick={() => setOpenModal(true)}
            >
                <BorderColorIcon />
            </button>
        </div>
    )
}
