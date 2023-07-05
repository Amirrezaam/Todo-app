import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Btn from '../components/btn/Btn';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { confirmPasswordValidation, valueValidation } from '../helper/validation';
import { updateUser } from '../service/api';

function ChangePassword({ users, setReRender }) {

    const navigate = useNavigate();

    const [data, setData] = useState({
        password: "",
        confirmPassword: ""
    });

    const [errorData, setErrorData] = useState({});

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function changePassword() {

        if (Object.values(errorData).find(val => val === false) === false ||
            Object.values(data).filter(val => !val.length)?.length ||
            !Object.keys(errorData).length) {
            alert("Please check for errors");
            return;
        }

        const userId = Object.keys(users).find(key => key === localStorage.getItem("user"));

        let user = {
            ...users[userId],
            password: data.password,
        }

        updateUser(userId, user)
            .then(res => { localStorage.removeItem("user"); navigate("/login"); setReRender(prev => !prev) })
            .catch(err => console.log(err))

    }

    useEffect(() => {
        let userId = localStorage.getItem("user");

        if (userId) {
            if (!Object.keys(users).find(key => key === userId)) {
                navigate("/");
            }
        }
    }, [])

    return (
        <>
            <h2 className="text-white font-pacifico text-4xl text-center">Change password</h2>
            <div className="w-full mt-10">
                <label className="text-white ml-1 font-bold mt-5 inline-block" htmlFor="password">Password</label>
                <div className="relative">
                    <input
                        className="input w-full mt-1"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password . . ."
                        value={data.password}
                        onChange={e => { setData({ ...data, password: e.target.value }); setErrorData({ ...errorData, password: valueValidation(e.target.value, "password") }); }}
                        onKeyPress={e => { if (e.key === "Enter") { changePassword(); } }}
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
                <label className="text-white ml-1 font-bold inline-block mt-5" htmlFor="confirm-password">Confirm Password</label>
                <div className="relative">
                    <input
                        className="input w-full mt-1"
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password . . ."
                        value={data.confirmPassword}
                        onChange={e => { setData({ ...data, confirmPassword: e.target.value }); setErrorData({ ...errorData, confirmPassword: confirmPasswordValidation(e.target.value, data.password) }); }}
                        onKeyPress={e => { if (e.key === "Enter") { changePassword(); } }}
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
                        text="Change password"
                        className="bg-[#B39CD0] mt-5 font-bold"
                        onClick={changePassword}
                        icon={<PublishedWithChangesIcon />}
                    />
                </div>
            </div>
        </>
    )
}

export default ChangePassword;