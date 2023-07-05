import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Btn from '../components/btn/Btn';
import Cookies from 'js-cookie';

function Login({ users }) {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function loginUser() {
        const user = Object.keys(users).find(key => users[key].email === email && users[key].password === password);
        const invalidUser = Object.keys(users).find(key =>
            (users[key].email === email && users[key].password !== password) ||
            (users[key].email !== email && users[key].password === password)
        );

        if (user) {
            navigate("/");
            Cookies.set("userId", user, { expires: 7 })
            localStorage.setItem("user", user);
            return;
        }
        else if (invalidUser) {
            alert("The email or password is incorrect.");
            return;
        }
        else {
            alert("You dont have an account.");
            return;
        }
    }

    useEffect(() => {
        if (Object.keys(users).find(key => key === localStorage.getItem("user"))) {
            navigate("/");
        }
    }, [])

    return (
        <>
            <h2 className="text-white font-pacifico text-4xl text-center">Login</h2>
            <div className="w-full mt-10">
                <label className="text-white ml-1 font-bold" htmlFor="email">Email</label>
                <input
                    className="input w-full mt-1"
                    id="email"
                    type="text"
                    placeholder="Enter your email . . ."
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyPress={e => { if (e.key === "Enter") { loginUser(); } }}
                />
                <label className="text-white ml-1 font-bold mt-5 inline-block" htmlFor="password">Password</label>
                <div className="relative">
                    <input
                        className="input w-full mt-1"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password . . ."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyPress={e => { if (e.key === "Enter") { loginUser(); } }}
                    />
                    <span
                        onClick={() => setShowPassword(prev => !prev)}
                        className="cursor-pointer text-white absolute top-[50%] translate-y-[-50%] right-2">
                        {
                            showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />
                        }
                    </span>
                </div>
                <p className="text-slate-400 float-right mt-1 text-sm">
                    <NavLink to="/password-recovery">Forgot your password?</NavLink>
                </p>
                <div className="btn-container w-full flex justify-center">
                    <Btn
                        text="Login"
                        className="bg-[#B39CD0] mt-5 font-bold"
                        onClick={loginUser}
                        icon={<LoginIcon />}
                    />
                </div>
                <p className="text-white text-center mt-3">
                    Don't have an account yet? <ArrowForwardIcon /> <NavLink className="underline" to="/register">Sign up</NavLink>
                </p>
            </div>
        </>
    )
}
export default Login;