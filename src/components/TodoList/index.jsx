import Header from './Header/Header';
import TodoList from './Todo/TodoList';
import './styles.scss'
import { useEffect, useState } from 'react/cjs/react.development';
import Footer from './Footer/Footer';
import PropTypes from 'prop-types';
import todoApi from '../../api/todoApi';


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

function Todolist({todo, addTodoList, checkCompleted, removeTodo, edtItem, clearCompletedItem, getListAll}) {
    useEffect(() => {
        todoApi.getAll()
            .then((res) => {
                getListAll(res.data);
            })
    }, [getListAll])
    localStorage.setItem('todoList', JSON.stringify((todo.toJS())));
    const [status, setStatus] = useState('All');
    const setFilterStatus = (status= '')  => {
        setStatus(status);
    }

    return (
        <div className="todo-app">
            <h1>todos</h1>
            <Header
                addTodo={addTodoList}
                todo= {todo}
            />
            <TodoList 
                todoList={filterbyStatus(todo, status)} 
                todoOnClick={checkCompleted}
                todoOnDeletedClick={removeTodo} 
                edtItem={edtItem} 
                />
            <Footer 
                todo = {todo}
                setFilterStatus={setFilterStatus}
                status={status}
                numOfTodoItemCompleted={filterbyStatus(todo.toJS(), "Completed").length}
                clearCompletedItem={clearCompletedItem}
                />
        </div>
    );
}

export default Todolist;