import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Btn from '../components/btn/Btn';
import { fetchUsers, signUpFailed, signUpRequest, signUpSuccess } from '../redux/user/userActions';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Signup() {

    const usersState = useSelector(state => state.usersState);
    const { users: state, error, loading } = usersState;
    const [users, setUsers] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [password, setPassword] = useState("");
    const [passwordValidate, setPasswordValidate] = useState(true);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordValidate, setConfirmPasswordValidate] = useState(true);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const passwordValidation = e => {
        setPassword(e.target.value);
        if (e.target.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/) || !e.target.value.length) {
            setPasswordValidate(true);
        } else {
            setPasswordValidate(false);
        }
    }

    const confirmPasswordValidation = e => {
        setConfirmPassword(e.target.value);
        if (e.target.value == password || !e.target.value.length) {
            setConfirmPasswordValidate(true);
        } else {
            setConfirmPasswordValidate(false);
        }
    }

    function signUpUser() {

        if (
            !password.length ||
            !password.trim().length ||
            !confirmPassword.length ||
            !confirmPassword.trim().length ||
            !passwordValidate ||
            !confirmPasswordValidate
        ) {
            setPasswordValidate(false);
            setConfirmPasswordValidate(false);
            return;
        }

        const userId = Object.keys(users).find(key => key == localStorage.getItem("user"));

        let user = {
            ...users[userId],
            password,
        }

        axios.put(`${process.env.REACT_APP_USER_BASE_URL}/users/${userId}.json`, user)
            .then(res => { localStorage.removeItem("user"); navigate("/login") })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        dispatch(fetchUsers())
        if (!localStorage.getItem("user")) {
            navigate("/");
        }
    }, [])

    useEffect(() => {
        setUsers(state);
    }, [state])

    return (
        <div className="container-box scr w-[90%] md:w-[60%] lg:w-[40%]">
            <h2 className="text-white font-pacifico text-4xl text-center">Change password</h2>
            <div className="w-full mt-10">
                <label className="text-white ml-1 font-bold mt-5 inline-block" htmlFor="password">Password</label>
                <div className="relative">
                    <input
                        className="input w-full mt-1"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password . . ."
                        value={password}
                        onChange={e => passwordValidation(e)}
                    />
                    <span
                        onClick={() => setShowPassword(prev => !prev)}
                        className="cursor-pointer text-white absolute top-[50%] translate-y-[-50%] right-2">
                        {
                            showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />
                        }
                    </span>
                </div>
                {passwordValidate ? null : <span className="text-[#f96d6d]">Your password must be at least 8 characters long and include letters, numbers and special characters</span>}
                <br />
                <label className="text-white ml-1 font-bold inline-block mt-5" htmlFor="confirm-password">Confirm Password</label>
                <div className="relative">
                    <input
                        className="input w-full mt-1"
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password . . ."
                        value={confirmPassword}
                        onChange={e => confirmPasswordValidation(e)}
                    />
                    <span
                        onClick={() => setShowConfirmPassword(prev => !prev)}
                        className="cursor-pointer text-white absolute top-[50%] translate-y-[-50%] right-2">
                        {
                            showConfirmPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />
                        }
                    </span>
                </div>
                {confirmPasswordValidate ? null : <span className="text-[#f96d6d]">It is not equal to password</span>}
                <br />
                <div className="btn-container w-full flex justify-center">
                    <Btn
                        text="Change password"
                        className="bg-[#B39CD0] mt-5 font-bold"
                        onClick={signUpUser}
                        icon={<PublishedWithChangesIcon />}
                    />
                </div>
            </div>
        </div >
    )
}
