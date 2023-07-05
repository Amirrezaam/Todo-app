import React, { useEffect } from 'react'
import Btn from '../components/btn/Btn'
import InputAddTodo from '../components/input add todo/InputAddTodo'
import Todo from '../components/todo/Todo'
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { NavLink, useNavigate } from 'react-router-dom';
import { installPrompt } from '../redux/user/userActions';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import { useDispatch, useSelector } from 'react-redux';

function Home({ users, user, setUser }) {

    const { promptInstall } = useSelector(state => state.usersState);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    }

    useEffect(() => {

        window.addEventListener("beforeinstallprompt", e => {
            dispatch(installPrompt(e));
        })

    }, [])

    useEffect(() => {

        let userId = localStorage.getItem("user");
        const findUser = Object.keys(users).find(key => key === userId);

        if (findUser) {
            setUser(users[findUser])
        }
    }, [user])

    return (
        <>
            {
                promptInstall &&
                <div
                    className={`w-full h-[100vh] fixed top-0 left-0 bg-black/50 flex items-center justify-center z-[9999]`}
                >
                    <div className={`bg-[#4B4453] rounded-lg rounded-tr-lg p-6 relative`}>
                        <span className="absolute top-[-25px] left-[50%] translate-x-[-50%] w-[50px] h-[50px] rounded-full bg-inherit text-white flex items-center justify-center">
                            <InstallMobileIcon sx={{ fontSize: "32px" }} />
                        </span>
                        <p className="text-white text-2xl my-4">Do you want to install this app?</p>

                        <div className="flex items-center justify-center">
                            <Btn
                                className="border-2 border-solid border-white text-white text-base mr-2"
                                onClick={() => dispatch(installPrompt(null))}
                                text="Cancel"
                                icon={<CloseIcon />}
                            />

                            <Btn
                                className="bg-[#845EC2] text-white text-base"
                                onClick={() => { promptInstall.prompt(); dispatch(installPrompt(null)) }}
                                icon={<DownloadIcon />}
                                text="Install"
                            />
                        </div>
                    </div>
                </div>
            }
            <div className="flex justify-between items-center">
                {
                    user &&
                    <NavLink to="/dashboard" className="text-white font-bold flex items-center">
                        <span className="mr-1">{user?.name}</span> <span className="rotate"><SettingsIcon /></span>
                    </NavLink>
                }
                {
                    user ?
                        <div className="flex items-center justify-end">
                            <Btn
                                text="Logout"
                                icon={<LogoutIcon />}
                                className="text-white !h-[35px]"
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
            <Todo users={users} username={user?.name} />
        </>
    )
}

export default Home;