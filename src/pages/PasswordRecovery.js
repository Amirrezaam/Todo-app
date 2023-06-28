import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../redux/user/userActions';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Btn from '../components/btn/Btn';

export default function Login() {

    const usersState = useSelector(state => state.usersState);
    const { users: state, error, loading } = usersState;
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [users, setUsers] = useState(null);

    function verifyUser() {
        if (users) {
            const user = Object.keys(users).find(key => users[key].email == email);

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
        else {
            alert("Please try again !!!");
            return;
        }
    }

    useEffect(() => {
        setUsers(state);
    }, [state])

    useEffect(() => {
        dispatch(fetchUsers());
        if (localStorage.getItem("user")) {
            navigate("/");
        }
    }, [])

    return (
        <div className="container-box w-[90%] md:w-[60%] lg:w-[40%]">
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
        </div>
    )
}
