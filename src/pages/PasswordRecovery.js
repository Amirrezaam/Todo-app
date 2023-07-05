import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Btn from '../components/btn/Btn';

function PasswordRecovery({ users }) {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    function verifyUser() {
        const user = Object.keys(users).find(key => users[key].email === email);

        if (user) {
            navigate("/change-password");
            localStorage.setItem("user", user)
            return;
        }
        else {
            alert("This email is not exist.");
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
            <h2 className="text-white font-pacifico text-4xl text-center">Account recovery</h2>
            <div className="w-full h-[80%] flex flex-col justif-center mt-10">
                <label className="text-white ml-1 font-bold" htmlFor="email">Email</label>
                <input
                    className="input w-full mt-1"
                    id="email"
                    type="text"
                    placeholder="Enter your email . . ."
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyPress={e => { if (e.key === "Enter") { verifyUser() } }}
                />
                <div className="btn-container w-full flex justify-center">
                    <Btn
                        text="Verify"
                        className="bg-[#B39CD0] mt-5 font-bold"
                        onClick={verifyUser}
                        icon={<FingerprintIcon sx={{ fontSize: "28px" }} />}
                    />
                </div>
            </div>
        </>
    )
}
export default PasswordRecovery;