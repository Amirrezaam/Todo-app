import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import Btn from '../components/btn/Btn';
import { fetchUsers, signUpFailed, signUpRequest, signUpSuccess } from '../redux/user/userActions';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Signup() {

    const usersState = useSelector(state => state.usersState);
    const { users: state, error, loading } = usersState;
    const [users, setUsers] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [emailValidate, setEmailValidate] = useState(true);

    const [name, setName] = useState("");
    const [nameValidate, setNameValidate] = useState(true);

    const [password, setPassword] = useState("");
    const [passwordValidate, setPasswordValidate] = useState(true);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordValidate, setConfirmPasswordValidate] = useState(true);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const emailValidation = e => {
        setEmail(e.target.value);
        if (e.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) || !e.target.value.length) {
            setEmailValidate(true);
        } else {
            setEmailValidate(false);
        }
    }

    const nameValidation = e => {
        setName(e.target.value);
        if (e.target.value.length > 2 && e.target.value.length < 21 || !e.target.value.length) {
            setNameValidate(true);
        } else {
            setNameValidate(false);
        }
    }

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

        if (!email.length ||
            !emailValidate ||
            !email.trim().length) {
            setEmailValidate(false);
            return;
        }

        if (!name.length ||
            !name.trim().length ||
            !nameValidate) {
            setNameValidate(false);
            return;
        }

        if (!password.length ||
            !password.trim().length ||
            !passwordValidate) {
            setPasswordValidate(false);
            return;
        }

        if (!confirmPassword.length ||
            !confirmPassword.trim().length ||
            !confirmPasswordValidate) {
            setConfirmPasswordValidate(false);
            return;
        }

        if (users) {
            if (Object.keys(users).find(key => users[key].email == email)) {
                alert("This email has already been used");
                return;
            }
        }

        let user = {
            id: uuid(),
            email,
            password,
            name,
            todos: null
        }

        dispatch(signUpRequest());

        axios.post(`${process.env.REACT_APP_USER_BASE_URL}/users.json`, user)
            .then(res => { dispatch(signUpSuccess(res.data.name, user)); localStorage.setItem("user", res.data.name); navigate("/") })
            .catch(err => dispatch(signUpFailed(err)))
    }

    useEffect(() => {
        dispatch(fetchUsers());
        if (localStorage.getItem("user")) {
            navigate("/");
        }
    }, [])

    useEffect(() => {
        setUsers(state);
    }, [state])

    return (
        <>
            <div className="container-box scr w-[90%] md:w-[60%] lg:w-[40%]">
                <h2 className="text-white font-pacifico text-4xl text-center">Sign up</h2>
                <div className="w-full mt-10">
                    <label className="text-white ml-1 font-bold" htmlFor="email">Email</label>
                    <input
                        className="input w-full mt-1"
                        id="email"
                        type="text"
                        placeholder="Enter your email . . ."
                        value={email}
                        onChange={e => emailValidation(e)}
                        onKeyPress={e => { if (e.key === "Enter") { signUpUser(); } }}
                    />
                    {emailValidate ? null : <span className="text-[#f96d6d]">Your email is not valid</span>}
                    <br />
                    <label className="text-white ml-1 font-bold mt-5 inline-block" htmlFor="name">Name</label>
                    <input
                        className="input w-full mt-1"
                        id="name"
                        type="text"
                        placeholder="Enter your name . . ."
                        value={name}
                        onChange={e => nameValidation(e)}
                        onKeyPress={e => { if (e.key === "Enter") { signUpUser(); } }}
                    />
                    {nameValidate ? null : <span className="text-[#f96d6d]">Your name must be between 3 and 20 characters</span>}
                    <br />
                    <label className="text-white ml-1 font-bold mt-5 inline-block" htmlFor="password">Password</label>
                    <div className="relative">
                        <input
                            className="input w-full mt-1"
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password . . ."
                            value={password}
                            onChange={e => passwordValidation(e)}
                            onKeyPress={e => { if (e.key === "Enter") { signUpUser(); } }}
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
                    <label
                        className="text-white ml-1 font-bold inline-block"
                        htmlFor="confirm-password"
                    >
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            className="input w-full mt-1"
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password . . ."
                            value={confirmPassword}
                            onChange={e => confirmPasswordValidation(e)}
                            onKeyPress={e => { if (e.key === "Enter") { signUpUser(); } }}
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
                            text="Sign up"
                            className="bg-[#B39CD0] mt-3 font-bold"
                            onClick={signUpUser}
                            icon={<HowToRegIcon />}
                        />
                    </div>
                    <p className="text-white text-center mt-3">
                        You already have an account? <ArrowForwardIcon /> <NavLink className="underline" to="/login">Login</NavLink>
                    </p>
                </div>
            </div >
        </>
    )
}
