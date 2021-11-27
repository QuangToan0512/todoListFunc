import Header from './Header/Header';
import TodoList from './Todo/TodoList';
import './styles.scss'
import { useState } from 'react/cjs/react.development';
import Footer from './Footer/Footer';
import PropTypes from 'prop-types';


Todolist.propTypes = {
    
};

export const filterbyStatus = (todos= [], status = "") => {
    switch (status) {
        case 'Active':
            return todos.filter(todo => todo.status !== "Completed");
        case 'Completed':
            return todos.filter(todo => todo.status === "Completed");
        default:
            return todos;
    }
}

function Todolist({todo, addTodoList, checkCompleted, removeTodo, edtItem, clearCompletedItem}) {
    
    const [status, setStatus] = useState('All');
    const setFilterStatus = (status= '')  => {
        setStatus(status);
    }

    return (
        <div className="todo-app">
            <h1>todos</h1>
            <Header addTodo={addTodoList}/>
            <TodoList 
                todoList={filterbyStatus(todo, status)} 
                todoOnClick={checkCompleted}
                todoOnDeletedClick={removeTodo} 
                edtItem={edtItem} 
                />
            <Footer
                setFilterStatus={setFilterStatus}
                status={status}
                numOfTodoItemCompleted={filterbyStatus(todo.toJS(), "Completed").length}
                clearCompleted={clearCompletedItem}
                />
        </div>
    );
}

export default Todolist;