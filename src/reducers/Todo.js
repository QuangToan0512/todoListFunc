import { List, Map, fromJS, setIn } from "immutable";
import { filterbyStatus } from "../components/TodoList";
const Immutable = require('immutable')
const axios = require('axios')

const initialState = Immutable.fromJS({
    todoList: [
    ],
})
console.log(initialState);
export default function Todos(state = initialState, action) {
    debugger
    // const newTodoList = state.get('todoList').toJS()
    switch (action.type) {
        
        case 'ADD_TODO':
            return state.set('todoList', state.get('todoList').push(action.payload));
        case 'GET_LIST': 
            debugger
            console.log(fromJS(action.payload));
            return fromJS({todoList :action.payload})
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
            console.log(state.set(filterbyStatus(state.get('todoList').toJS(), 'Active')));
            return state.set('todoList',fromJS(filterbyStatus(state.get('todoList').toJS(), 'Active')));
      default:
        return state;
    }
}