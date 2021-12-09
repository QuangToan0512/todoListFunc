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
        checkCompleted: (data,idx) => dispatch(checkCompleted(data,idx)),
        removeTodo: idx => dispatch(removeTodo(idx)),
        edtItem: (formValueEdited, idx, id) => dispatch(edtItem(formValueEdited, idx, id)),
        clearCompletedItem: (arr) => dispatch(clearCompletedItem(arr)),
        getListAll: (todo) => dispatch(getList(todo))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Todolist)