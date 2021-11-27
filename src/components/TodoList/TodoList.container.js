import { connect } from "react-redux";
import { addTodoList } from "../../actions/todo";
import TodoList from "./Todo/TodoList";

const mapStateToProps = (state) => {
    return {
        todo: state.todo.get('todoList')
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addTodoList: todo => dispatch(addTodoList(todo)),
        // checkCompleted: idx => dispatch(checkCompleted(idx)),
        // removeTodo: todo => dispatch(removeTodo(todo)),
        // edtItem: (data, idx) => dispatch(edtItem(data, idx)),
        // clearCompletedItem: () => dispatch(clearCompletedItem)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TodoList)