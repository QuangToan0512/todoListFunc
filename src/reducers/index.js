import { combineReducers } from "redux";
import Todos from './Todo.js'

const rootReducer = combineReducers({
    todo: Todos,
})

export default rootReducer