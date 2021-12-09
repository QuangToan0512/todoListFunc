import {fromJS } from "immutable";
import { filterbyStatus } from "../components/TodoList";
import { ADD_TODO, CHECK_COMPLETED_TODO, CLEAR_COMPLETED_TODO, EDIT_TODO, GET_LIST, REMOVE_TODO } from "../constants/actionsTypes";
const Immutable = require('immutable')

const initialState = Immutable.fromJS({
    todoList: JSON.parse(localStorage.getItem('todoList')) || []
})
export default function Todos(state = initialState, action) {
    switch (action.type) {
        case GET_LIST:
            return fromJS({todoList :action.payload});
        case ADD_TODO:
            return state.set('todoList', state.get('todoList').push(action.payload));
            case REMOVE_TODO:
            const todoOnRemoveTodo = state.get('todoList').remove(action.payload);
            return state.set('todoList', todoOnRemoveTodo);
        case CHECK_COMPLETED_TODO:
            const index = action.payload;
            const status = state.getIn(['todoList', index, 'status'])
            return state.setIn(['todoList', index, 'status'],status === 'Completed' ? 'Active' : 'Completed')           
        case EDIT_TODO:
            const {idx, formValueEdited} = action.payload
            return state.setIn(['todoList', idx, 'text'], formValueEdited.text)
        case CLEAR_COMPLETED_TODO:
            return state.set('todoList',fromJS(filterbyStatus(state.get('todoList').toJS(), 'Active')));
      default:
        return state;
    }
}