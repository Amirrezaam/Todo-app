import axios from "axios"

const signUpRequest = () => {
    return {
        type: "SIGN_UP_REQUEST"
    }
}

const signUpSuccess = (id, user) => {
    return {
        type: "SIGN_UP_SUCCESS",
        payload: { id, user }
    }
}

const signUpFailed = err => {
    return {
        type: "SIGN_UP_FAILED",
        payload: err
    }
}

const fetchUsersRequest = () => {
    return {
        type: "FETCH_USERS_REQUEST"
    }
}

const fetchUsersSuccess = users => {
    return {
        type: "FETCH_USERS_SUCCESS",
        payload: users
    }
}

const fetchUsersFailed = err => {
    return {
        type: "FETCH_USERS_FAILED",
        payload: err
    }
}

const fetchUsers = () => {
    return (dispatch) => {

        dispatch(fetchUsersRequest());

        axios.get(`${process.env.REACT_APP_USER_BASE_URL}/users.json`)
            .then(res => {
                dispatch(fetchUsersSuccess(res.data))
            }).catch(err => dispatch(fetchUsersFailed(err.message)))
    }
}

export {
    signUpRequest,
    signUpSuccess,
    signUpFailed,
    fetchUsersFailed,
    fetchUsers
}