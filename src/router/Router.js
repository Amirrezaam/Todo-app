import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { CircleLoader } from 'react-spinners'
import ChangePassword from '../pages/ChangePassword'
import Dashboard from '../pages/Dashboard'
import Error from '../pages/Error'
import Home from '../pages/Home'
import Login from '../pages/Login'
import PasswordRecovery from '../pages/PasswordRecovery'
import Signup from '../pages/Signup'
import { fetchUsers } from '../redux/user/userActions'
import ReplayIcon from '@mui/icons-material/Replay';

export default function Router() {

    const usersState = useSelector(state => state.usersState);
    const { users: state, loading, error } = usersState;
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState(null);
    const [reRender, setReRender] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [reRender])

    useEffect(() => {
        setUsers(state);
        if (localStorage.getItem("user") && state) {
            const userName = Object.keys(state).find(key => key === localStorage.getItem("user"))
            setUser(state[userName])
        }
    }, [state])

    return (
        <div className="container-box scr w-[90%] md:w-[60%] lg:w-[40%]">
            {
                loading ?
                    <div className="w-full mt-8 flex items-center justify-center">
                        <CircleLoader color="#845EC2" size={90} />
                    </div> :
                    error ?
                        <div className="flex justify-center mt-4">
                            <button
                                className="border-2 border-solid border-[#845EC2] w-[40px] h-[40px] rounded-full flex justify-center items-center text-white"
                                onClick={() => setReRender(prev => !prev)}
                            >
                                <ReplayIcon />
                            </button>
                        </div> :
                        users ?
                            <Routes>
                                <Route path="/dashboard" element={<Dashboard users={users} user={user} setReRender={setReRender} />} />
                                <Route path="/change-password" element={<ChangePassword users={users} setReRender={setReRender} />} />
                                <Route path="/password-recovery" element={<PasswordRecovery users={users} />} />
                                <Route path="/register" element={<Signup users={users} />} />
                                <Route path="/login" element={<Login users={users} />} />
                                <Route path="/" element={<Home users={users} user={user} setUser={setUser} />} />
                                <Route path="*" element={<Error />} />
                            </Routes>
                            : null
            }
        </div>

    )
}
