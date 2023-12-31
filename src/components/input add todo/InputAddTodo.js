import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import { fetchTodos, fetchTodosRequest } from '../../redux/todos/todosActions';
import { createTodo } from '../../service/api';
import Btn from '../btn/Btn';
import "./inputAddTodo.css"

export default function InputAddTodo({ users }) {

    const maxLength = 30;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ref = useRef();
    const [value, setValue] = useState("");

    function create() {
        const user = Object.keys(users).find(key => key === localStorage.getItem("user"));

        if (!user) {
            navigate("/login");
            return;
        }

        if (!value || !value.length || !value.trim().length) {
            alert("Please write somthing");
            setValue("");
            ref.current.focus();
            return;
        }

        let todo = {
            id: uuid(),
            todoText: value,
            completed: false,
            important: false,
            date: new Date()
        }

        dispatch(fetchTodosRequest());

        createTodo(user, todo)
            .then(res => { dispatch(fetchTodos()); setValue(""); })
            .catch(err => alert("TRY AGAIN !!!"))
    }

    return (
        <div className="input-box flex justify-between items-end mt-10">
            <div className={`textInputWrapper border-2 border-solid border-[#B39CD0] relative flex items-center justify-between`}>
                <div className="w-[7%] h-[40px] text-white relative">
                    <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">{maxLength - value.length}</span>
                    <div className="h-full bg-[#845EC2]" style={{ width: value.length / maxLength * 100 + "%" }}>

                    </div>
                </div>
                <input
                    placeholder="Write your task !!!"
                    type="text"
                    value={value}
                    ref={ref}
                    className="textInput"
                    maxLength={maxLength}
                    onChange={e => setValue(e.target.value)}
                    onKeyPress={e => { if (e.key === "Enter") { create(); } }}
                />
                <div className="btn-wrapper absolute top-0 right-0">
                    <Btn
                        className="text-white text-base"
                        onClick={create}
                        icon="+"
                        text="Add"
                    />
                </div>
            </div>

        </div>
    )
}
