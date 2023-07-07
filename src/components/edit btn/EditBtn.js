import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchTodos, fetchTodosRequest } from '../../redux/todos/todosActions';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';
import Btn from '../btn/Btn';
import { updateTodo } from '../../service/api';
import "./editBtn.css"

export default function EditBtn({ todo, id, users }) {

    const [editedValue, setEditedValue] = useState(todo.todoText);
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();

    const editTodo = () => {

        if (!editedValue.length || !editedValue.trim().length) {
            alert("Please fill input !!!");
            return;
        }

        let updatedTodo = {
            ...todo,
            todoText: editedValue
        }

        let userId = Object.keys(users).find(key => key === localStorage.getItem("user"));

        dispatch(fetchTodosRequest());

        updateTodo(userId, id, updatedTodo)
            .then(res => {
                dispatch(fetchTodos());
                setOpenModal(false);
                alert("DONE !!!");
            })
            .catch(err => {
                dispatch(fetchTodos());
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
                    >
                        <div className="bg-[#4B4453] w-[90%] md:w-[50%] lg:w-[30%] rounded-lg rounded-tr-lg p-6 relative">
                            <span className="absolute top-[-25px] left-[50%] translate-x-[-50%] w-[50px] h-[50px] rounded-full bg-inherit text-white flex items-center justify-center">
                                <ModeEditIcon sx={{ fontSize: "32px" }} />
                            </span>
                            <input
                                className="block my-8 edit-input"
                                placeholder="Please edit task"
                                value={editedValue}
                                onChange={e => setEditedValue(e.target.value)}
                                onKeyPress={e => { if (e.key === "Enter") { editTodo(); } }}
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
