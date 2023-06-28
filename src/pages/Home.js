import React, { useEffect, useState } from 'react'
import Btn from '../components/btn/Btn'
import InputAddTodo from '../components/input/InputAddTodo'
import Todo from '../components/todo/Todo'
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchUsers } from '../redux/user/userActions';
import { useDispatch, useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Home() {

    const usersState = useSelector(state => state.usersState);
    const { users: state, error, loading } = usersState;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState(null);
    const [users, setUsers] = useState(null);

    const logoutHandler = () => {
        localStorage.removeItem("user");
        setUsername(null);
        navigate("/");
    }

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    useEffect(() => {
        setUsers(state);
        if (localStorage.getItem("user") && state) {
            const userName = Object.keys(state).find(key => key == localStorage.getItem("user"))
            setUsername(state[userName].name)
        }
    }, [state])

    return (
        <>
            <div className="container-box scr w-[90%] md:w-[60%] lg:w-[40%]">
                <div className="flex justify-between items-center">
                    {
                        username && 
                        <NavLink to="/dashboard" className="text-white font-bold flex items-center">
                            <span className="mr-1">{username}</span> <span className="rotate"><SettingsIcon /></span>
                        </NavLink>
                    }
                    {
                        username ?
                            <div className="flex items-center justify-end">
                                <Btn
                                    text="Logout"
                                    icon={<LogoutIcon />}
                                    className="text-white !h-[35px] bg-[#C34A36]"
                                    onClick={logoutHandler}
                                />
                            </div>
                            :
                            <div className="flex items-center justify-end">
                                <NavLink to="/register">
                                    <Btn
                                        text="Signup"
                                        icon={<HowToRegIcon />}
                                        className="text-white"
                                    />
                                </NavLink>
                                <span className="text-white text-xl">/</span>
                                <NavLink to="/login">
                                    <Btn
                                        text="Login"
                                        icon={<LoginIcon />}
                                        className="text-white"
                                    />
                                </NavLink>
                            </div>
                    }
                </div>
                <div className="head">
                    <h1 className="text-4xl text-[#eee] mt-3 text-center select-none">Todo app</h1>
                </div>
                <InputAddTodo users={users} />
                <Todo users={users} username={username} />
            </div>
        </>
    )
}
