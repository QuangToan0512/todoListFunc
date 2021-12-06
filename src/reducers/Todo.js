import {fromJS } from "immutable";
import { filterbyStatus } from "../components/TodoList";
const Immutable = require('immutable')

const initialState = Immutable.fromJS({
    todoList: JSON.parse(localStorage.getItem('todoList')) || []
})
export default function Todos(state = initialState, action) {
    switch (action.type) {
        case 'GET_LIST':
            return fromJS({todoList :action.payload});
        case 'ADD_TODO':
            return state.set('todoList', state.get('todoList').push(action.payload));
        case 'checkCompleted':
            const index = action.payload;
            const status = state.getIn(['todoList', index, 'status'])
            return state.setIn(['todoList', index, 'status'],status === 'Completed' ? 'Active' : 'Completed')           
        case 'removeTodo':
            const todoOnRemoveTodo = state.get('todoList').remove(action.payload);
            return state.set('todoList', todoOnRemoveTodo);
        case 'edtItem':
            return state.setIn(['todoList', action.payload.idx, 'text'], action.payload.data)
        case 'clearCompleted':
            return state.set('todoList',fromJS(filterbyStatus(state.get('todoList').toJS(), 'Active')));
      default:
        return state;
    }
}