import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function FilterTodos({ setTodos, value }) {

    const { todos: state } = useSelector(state => state.todosState);
    let uncompletedCount = state &&
        Object.keys(state)
            .filter(key =>
                !state[key].completed
                && new Date(state[key].date).toLocaleDateString() == value.toLocaleDateString()
            ).length

    let allCount = state &&
        Object.keys(state)
            .filter(key =>
                new Date(state[key].date).toLocaleDateString() == value.toLocaleDateString()
            ).length

    let completedCount = state &&
        Object.keys(state)
            .filter(key =>
                state[key].completed
                && new Date(state[key].date).toLocaleDateString() == value.toLocaleDateString()
            ).length

    const [filterValue, setFilterValue] = useState("All");

    useEffect(() => {
        switch (filterValue) {
            case "All":
                setTodos(state);
                return;
            case "Completed":
                const completedTodos =
                    Object.keys(state)
                        .filter(key => state[key].completed)
                        .reduce((cur, key) => { return Object.assign(cur, { [key]: state[key] }) }, {});
                setTodos(completedTodos);
                return;
            case "Uncompleted":
                const uncompletedTodos =
                    Object.keys(state)
                        .filter(key => !state[key].completed)
                        .reduce((cur, key) => { return Object.assign(cur, { [key]: state[key] }) }, {});
                setTodos(uncompletedTodos);
                return;
            case "Important":
                const importantTodos =
                    Object.keys(state)
                        .filter(key => state[key].important)
                        .reduce((cur, key) => { return Object.assign(cur, { [key]: state[key] }) }, {});
                setTodos(importantTodos);
                return;
            default:
                setTodos(state);
                return;
        }
    }, [filterValue])

    return (
        <>
            <select
                className="w-[70%] h-[40px] bg-transparent outline-none p-2 text-[#eee] border-b-2 border-solid border-[#B39CD0]"
                value={filterValue}
                onChange={e => setFilterValue(e.target.value)}>
                <option value="All">
                    All ({allCount})
                </option>
                <option value="Completed">
                    Completed ({completedCount})
                </option>
                <option value="Uncompleted">
                    Uncompleted ({uncompletedCount})
                </option>
                <option value="Important">
                    Important ({state &&
                        Object.keys(state)
                            .filter(key =>
                                state[key].important
                                && new Date(state[key].date).toLocaleDateString() == value.toLocaleDateString()
                            ).length})
                </option>
            </select>
            <div className="w-[100px] h-[50px] rounded-tl-[110px] rounded-tr-[110px] relative bg-[#B39CD0] overflow-hidden">
                <div className="w-[70%] h-[70%] rounded-tl-[110px] rounded-tr-[110px] absolute bg-[#353238] bottom-0 left-[50%] translate-x-[-50%]"></div>
                <div className="h-full transition-all bg-[#845EC2]" style={{ width: completedCount / allCount * 100 + "%" }}></div>
                <span className="absolute bottom-0 left-[50%] translate-x-[-50%] text-white">{completedCount && (completedCount / allCount * 100).toFixed(1)}%</span>
            </div>
        </>
    )
}