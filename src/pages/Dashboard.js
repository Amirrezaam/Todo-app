import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { fetchUsers } from '../redux/user/userActions';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import axios from 'axios';
import Btn from '../components/btn/Btn';
import CloseIcon from '@mui/icons-material/Close';

export default function Dashboard() {

  const usersState = useSelector(state => state.usersState);
  const { users: state, error, loading } = usersState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [email, setEmail] = useState("");
  const [emailValidate, setEmailValidate] = useState(true);

  const [name, setName] = useState("");
  const [nameValidate, setNameValidate] = useState(true);

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

  function editUser() {

    if (!email.length ||
      !emailValidate ||
      !email.trim().length) {
      setEmailValidate(false);
      return;
    }

    if (
      !name.length ||
      !name.trim().length ||
      !nameValidate
    ) {
      setNameValidate(false);
      return;
    }

    let userId = Object.keys(state).find(key => key == localStorage.getItem("user"));

    if (state) {
      if (Object.keys(state).find(key => state[key].email == email && key != userId)) {
        alert("This email has already been used");
        return;
      }
    }

    let user = {
      ...state[userId],
      name,
      email
    }

    axios.put(`${process.env.REACT_APP_USER_BASE_URL}/users/${userId}.json`, user)
      .then(res => { localStorage.setItem("user", userId); navigate("/") })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    dispatch(fetchUsers());
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [])

  useEffect(() => {
    if (state) {
      let findUser = Object.keys(state).find(key => key == localStorage.getItem("user"));
      setUser(state[findUser]);
      setEmail(state[findUser].email);
      setName(state[findUser].name);
    }
  }, [state])

  return (
    <div className="container-box w-[90%] md:w-[60%] lg:w-[40%]">
      <h2 className="text-white font-pacifico text-4xl text-center mb-5">Dashboard</h2>
      <label className="text-white ml-1 font-bold" htmlFor="email">Email</label>
      <input
        className="input w-full mt-1"
        id="email"
        type="text"
        placeholder="Enter your email . . ."
        value={email}
        onChange={e => emailValidation(e)}
        onKeyPress={e => { if (e.key === "Enter") { } }}
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
        onKeyPress={e => { if (e.key === "Enter") { } }}
      />
      {nameValidate ? null : <span className="text-[#f96d6d]">Your name must be between 3 and 20 characters</span>}
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
    </div>
  )
}
