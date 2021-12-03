import { connect } from "react-redux";
import Todolist from "../components/TodoList";
import { addTodoList, checkCompleted, clearCompletedItem, edtItem, removeTodo, getList } from "../actions/todo";

const mapStateToProps = (state) => {
    return {
        todo: state.todo.get('todoList')
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addTodoList: todo => dispatch(addTodoList(todo)),
        checkCompleted: idx => dispatch(checkCompleted(idx)),
        removeTodo: todo => dispatch(removeTodo(todo)),
        edtItem: (data, idx) => dispatch(edtItem(data, idx)),
        clearCompletedItem: () => dispatch(clearCompletedItem()),
        getListAll: (todo) => dispatch(getList(todo))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Todolist)