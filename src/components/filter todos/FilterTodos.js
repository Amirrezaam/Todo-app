import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { displayTodos, todoCounter } from '../../helper/todoSetting';

export default function FilterTodos({ setTodos, value }) {

    const { todos: state } = useSelector(state => state.todosState);
    const [filterValue, setFilterValue] = useState("All");

    const changeHandler = (value) => {
        setFilterValue(value);
        switch (value) {
            case "All":
                setTodos(state);
                return;
            case "Completed":
                setTodos(displayTodos(state, "completed"));
                return;
            case "Uncompleted":
                setTodos(displayTodos(state, "uncompleted"));
                return;
            case "Important":
                setTodos(displayTodos(state, "important"));
                return;
            default:
                setTodos(state);
                return;
        }
    }

    useEffect(() => {
        setTodos(state);
        changeHandler(filterValue)
    }, [state])

    return (
        <>
            <select
                className="w-[70%] h-[40px] bg-transparent outline-none p-2 text-[#eee] border-b-2 border-solid border-[#B39CD0]"
                value={filterValue}
                onChange={e => changeHandler(e.target.value)}
            >
                <option value="All">
                    All ({todoCounter(state, value) || 0})
                </option>
                <option value="Completed">
                    Completed ({todoCounter(state, value, "completed") || 0})
                </option>
                <option value="Uncompleted">
                    Uncompleted ({todoCounter(state, value, "uncompleted") || 0})
                </option>
                <option value="Important">
                    Important ({todoCounter(state, value, "important") || 0})
                </option>
            </select>
            <div className="w-[100px] h-[50px] rounded-tl-[110px] rounded-tr-[110px] relative bg-[#B39CD0] overflow-hidden">
                <div className="w-[70%] h-[70%] rounded-tl-[110px] rounded-tr-[110px] absolute bg-[#353238] bottom-0 left-[50%] translate-x-[-50%]"></div>
                <div
                    className="h-full transition-all bg-[#845EC2]"
                    style={{ width: (todoCounter(state, value) ? todoCounter(state, value, "completed") / todoCounter(state, value) : 0) * 100 + "%" }}
                ></div>
                <span className="absolute bottom-0 left-[50%] translate-x-[-50%] text-white">
                    {
                        todoCounter(state, value) ?
                            ((todoCounter(state, value, "completed") / todoCounter(state, value) * 100).toFixed(1))
                            : 0
                    }%
                </span>
            </div>
        </>
    )
}