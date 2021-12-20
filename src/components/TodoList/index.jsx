import Header from './Header/Header';
import Todos from './Todo/TodoList';
import './styles.scss'
import { useState } from 'react/cjs/react.development';
import Footer from './Footer/Footer';
import PropTypes from 'prop-types';

Todolist.propTypes = {
    todo: PropTypes.object,
    addTodoList: PropTypes.func,
    checkCompleted: PropTypes.func,
    removeTodo: PropTypes.func,
    edtItem: PropTypes.func,
    clearCompleted: PropTypes.func,
    getListAll: PropTypes.func
};


function Todolist() {
    const [status, setStatus] = useState('All');
    const setFilterStatus = (status= '')  => {
        setStatus(status);
    }

    return (
        <div className="todo-app">
            <h1>todos</h1>
            <Header/>
            <Todos status = {status}/>
            <Footer
                setFilterStatus={setFilterStatus}
                status={status}
                />
        </div>
    );
}

export default Todolist;