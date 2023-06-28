const initState = {
    loading: false,
    todos: null,
    error: null,
}

const todosReducer = (state = initState, action) => {
    switch (action.type) {
        case "FETCH_TODOS_REQUEST":
            return {
                ...state,
                loading: true,
            }
        case "FETCH_TODOS_SUCCESS":
            return {
                ...state,
                loading: false,
                todos: action.payload,
                error: null
            }
        case "FETCH_TODOS_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export default todosReducer;