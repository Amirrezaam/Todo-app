import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Btn from '../components/btn/Btn';
import CloseIcon from '@mui/icons-material/Close';
import { valueValidation } from '../helper/validation';
import { updateUser } from '../service/api';

function Dashboard({ users, user, setReRender }) {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    name: "",
  });

  const [errorData, setErrorData] = useState({});

  function editUser() {

    if (Object.values(errorData).find(val => val === false) === false || !Object.keys(errorData).length) {
      alert("Please check for errors");
      return;
    }

    let userId = Object.keys(users).find(key => key === localStorage.getItem("user"));

    if (Object.keys(users).find(key => users[key].email === data.email && key !== userId)) {
      alert("This email has already been used");
      return;
    }

    let user = {
      ...users[userId],
      name: data.name,
      email: data.email
    }

    updateUser(userId, user)
      .then(res => { localStorage.setItem("user", userId); navigate("/"); setReRender(prev => !prev) })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    setData({ ...data, name: user?.name, email: user?.email })

    let userId = localStorage.getItem("user");

    if (userId) {
      if (!Object.keys(users).find(key => key === userId)) {
        navigate("/login");
      }
    }
  }, [user])

  return (
    <>
      <h2 className="text-white font-pacifico text-4xl text-center mb-5">Dashboard</h2>
      <label className="text-white ml-1 font-bold" htmlFor="email">Email</label>
      <input
        className="input w-full mt-1"
        id="email"
        type="text"
        placeholder="Enter your email . . ."
        value={data.email}
        onChange={e => { setData({ ...data, email: e.target.value }); setErrorData({ ...errorData, email: valueValidation(e.target.value, "email") }); }}
        onKeyPress={e => { if (e.key === "Enter") { editUser() } }}
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
        onKeyPress={e => { if (e.key === "Enter") { editUser() } }}
      />
      {errorData.name === false ? <span className="text-[#f96d6d]">Your name must be between 3 and 20 characters</span> : null}
      <p className="text-white mt-7 underline text-center">
        <NavLink to="/change-password">Change password</NavLink>
      </p>
      <div className="btn-container w-full ">
        <Btn
          text="Done"
          className="bg-[#B39CD0] mt-7 font-bold"
          onClick={editUser}
          icon={<DoneAllIcon />}
        />
        <Btn
          text="Cancel"
          className="border-2 border-solid border-[#B39CD0] mt-7 font-bold text-white"
          onClick={() => navigate("/")}
          icon={<CloseIcon />}
        />
      </div>
    </>
  )
}
export default Dashboard;