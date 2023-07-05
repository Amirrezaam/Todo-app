import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, } from '../../redux/todos/todosActions';
import 'react-calendar/dist/Calendar.css';
import Task from '../task/Task';
import CalendarBox from '../calendar box/CalendarBox';
import FilterTodos from '../filter todos/FilterTodos';
import CircleLoader from "react-spinners/CircleLoader";
import ReplayIcon from '@mui/icons-material/Replay';

export default function Todo({ users, username }) {

    const { todos: state, loading, error } = useSelector(state => state.todosState);
    const dispatch = useDispatch();

    const [value, onChange] = useState(new Date());
    const [todos, setTodos] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [reRender, setReRender] = useState(false);

    useEffect(() => {
        dispatch(fetchTodos())
    }, [reRender, username])

    return (
        <div className="w-full rounded-lg mt-6 pb-6">
            <h2 className="text-center text-2xl text-white mb-4">Your Tasks</h2>
            <div className="mb-6">
                <div className="w-full">
                    <input
                        className="w-full input"
                        value={searchValue}
                        placeholder="Search in tasks ..."
                        onChange={e => setSearchValue(e.target.value)}
                    />
                </div>
                <div className="my-4 flex justify-between items-end">
                    <FilterTodos setTodos={setTodos} value={value} />
                </div>
                <div className="w-full">
                    <CalendarBox onChange={onChange} value={value} />
                </div>
            </div>

            <div className="flex flex-wrap">
                {
                    loading ?
                        <div className="mx-auto mt-4">
                            <CircleLoader color="#845EC2" size={90} />
                        </div> :
                        error ?
                            <div className="mx-auto mt-4">
                                <button
                                    className="border-2 border-solid border-[#845EC2] w-[40px] h-[40px] rounded-full flex justify-center items-center text-white"
                                    onClick={() => setReRender(prev => !prev)}
                                >
                                    <ReplayIcon />
                                </button>
                            </div> :
                            todos ?
                                Object.keys(todos)
                                    .filter(key => todos[key]?.todoText?.includes(searchValue))
                                    .filter(key =>
                                        new Date(todos[key].date).toLocaleDateString() === value.toLocaleDateString()
                                    )
                                    .map((key, i) =>
                                        <Task key={key} users={users} todo={todos[key]} id={key} i={i} />
                                    )
                                : <p className="text-white text-xl text-center mx-auto">You don't have a TASK yet !!!</p>
                }
            </div>
        </div>
    )
}