import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import Btn from '../components/btn/Btn';
import { signUpFailed, signUpRequest, signUpSuccess } from '../redux/user/userActions';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { confirmPasswordValidation, valueValidation } from '../helper/validation';
import { CircleLoader } from 'react-spinners';
import { createUser } from '../service/api';

function Signup({ users }) {

    const { loading } = useSelector(state => state.usersState);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [data, setData] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: ""
    });

    const [errorData, setErrorData] = useState({});

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function signUpUser() {

        if (Object.values(errorData).find(val => val === false) === false ||
            Object.values(data).filter(val => !val.length)?.length ||
            !Object.keys(errorData).length) {
            alert("Please check for errors");
            return;
        }

        if (Object.keys(users).find(key => users[key].email === data.email)) {
            alert("This email has already been used");
            return;
        }

        let user = {
            id: uuid(),
            email: data.email,
            password: data.password,
            name: data.name,
            todos: null
        }

        dispatch(signUpRequest());

        createUser(user)
            .then(res => { dispatch(signUpSuccess(res.data.name, user)); localStorage.setItem("user", res.data.name); navigate("/") })
            .catch(err => dispatch(signUpFailed(err)))
    }

    useEffect(() => {
        if (Object.keys(users).find(key => key === localStorage.getItem("user"))) {
            navigate("/");
        }
    }, [])

    return (
        <>
            <h2 className="text-white font-pacifico text-4xl text-center">Sign up</h2>
            {
                loading ?
                    <div className="w-full mt-8 flex items-center justify-center">
                        <CircleLoader color="#845EC2" size={90} />
                    </div>
                    :
                    <div className="w-full mt-10">
                        <label className="text-white ml-1 font-bold" htmlFor="email">Email</label>
                        <input
                            className="input w-full mt-1"
                            id="email"
                            type="text"
                            placeholder="Enter your email . . ."
                            value={data.email}
                            onChange={e => { setData({ ...data, email: e.target.value }); setErrorData({ ...errorData, email: valueValidation(e.target.value, "email") }); }}
                            onKeyPress={e => { if (e.key === "Enter") { signUpUser(); } }}
                        />
                        {errorData.email === false ? <span className="text-[#f96d6d]">Your email is not valid</span> : null}
                        <br />
                        <label className="text-white ml-1 font-bold mt-5 inline-block" htmlFor="name">Name</label>
                        <input
                            className="input w-full mt-1"
                            id="name"
                            type="text"
                            placeholder="Enter your name . . ."
                            value={data.name}
                            onChange={e => { setData({ ...data, name: e.target.value }); setErrorData({ ...errorData, name: valueValidation(e.target.value, "name") }); }}
                            onKeyPress={e => { if (e.key === "Enter") { signUpUser(); } }}
                        />
                        {errorData.name === false ? <span className="text-[#f96d6d]">Your name must be between 3 and 20 characters</span> : null}
                        <br />
                        <label className="text-white ml-1 font-bold mt-5 inline-block" htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                className="input w-full mt-1"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password . . ."
                                value={data.password}
                                onChange={e => { setData({ ...data, password: e.target.value }); setErrorData({ ...errorData, password: valueValidation(e.target.value, "password") }); }}
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
                        {errorData.password === false ? <span className="text-[#f96d6d]">Your password must be at least 8 characters long and include letters, numbers and special characters</span> : null}
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
                                value={data.confirmPassword}
                                onChange={e => { setData({ ...data, confirmPassword: e.target.value }); setErrorData({ ...errorData, confirmPassword: confirmPasswordValidation(e.target.value, data.password) }); }}
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
                        {errorData.confirmPassword === false ? <span className="text-[#f96d6d]">It is not equal to password</span> : null}
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
            }
        </>
    )
}

export default Signup;