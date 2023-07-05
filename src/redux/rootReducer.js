import { combineReducers } from 'redux';
import todosReducer from './todos/todosReducer';
import userReducer from './user/userReducer';

const reducers = combineReducers({
    todosState: todosReducer,
    usersState: userReducer,
});

export default reducers;