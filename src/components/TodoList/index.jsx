import Header from './Header/Header';
import TodoList from './Todo/TodoList';
import './styles.scss'
import { useEffect, useState } from 'react/cjs/react.development';
import Footer from './Footer/Footer';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';

const axios = require('axios')


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
    debugger

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:3000/todoList'
        }).then((res) => {
                getListAll(res.data);
            })
            .catch((err)=> {console.log(err);})
    }, [])
    
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