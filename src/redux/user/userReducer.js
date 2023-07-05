const initState = {
    loading: false,
    users: null,
    error: null,
    promptInstall: null
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case "SIGN_UP_REQUEST",
            "FETCH_USERS_REQUEST":
            return {
                ...state,
                loading: true,
            }
        case "FETCH_USERS_SUCCESS":
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: null
            }
        case "SIGN_UP_SUCCESS":
            return {
                ...state,
                loading: false,
                users: {
                    ...state.users,
                    [action.payload.id]: action.payload.user
                },
                error: null
            }
        case "SIGN_UP_FAILED",
            "FETCH_USERS_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case "INSTALL_PROMPT":
            return{
                ...state,
                promptInstall: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;