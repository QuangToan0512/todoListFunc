import { List, Map, fromJS, setIn } from "immutable";
import { filterbyStatus } from "../components/TodoList";
const Immutable = require('immutable')

const initialState = Immutable.fromJS({
    todoList: [
        {id: 1, text: "Toan", status: "All"},
        {id: 2, text: "Linh", status: "Completed"},
        {id: 3, text: "Nam", status: "All"},
        {id: 4, text: "Toan", status: "All"},
    ],
})

export default function Todos(state = initialState, action) {

    // const newTodoList = state.get('todoList').toJS()
    switch (action.type) {
        
        case 'ADD_TODO':
            debugger
            
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
            console.log(state.set(filterbyStatus(state.get('todoList').toJS(), 'Active')));
            return state.set('todoList',fromJS(filterbyStatus(state.get('todoList').toJS(), 'Active')));
      default:
        return state;
    }
}