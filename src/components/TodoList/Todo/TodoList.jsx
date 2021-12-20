import React, {useEffect, useState} from 'react';
import './styles.scss'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { checkCompleted, edtItem, removeTodo } from '../../../actions/todo';
import { getStatus, getVisibleTodos } from '../../../reselect/todoSelector';
import {List} from 'immutable';
Todos.propTypes = {
    todoList: PropTypes.object,
    todoOnClick: PropTypes.func,
    todoOnDeleteClick: PropTypes.func,
    edtItem: PropTypes.func
}


function Todos({todo = List([]), checkCompleted, removeTodo, edtItem, status}) {

    localStorage.setItem('todoList', JSON.stringify((todo.toJS())));

    return (
        <ul className="todo-list">
            {
                todo.map((todo, index) => (
                   <Todo
                        todoOnDeleteClick={removeTodo}
                        todoOnClick={checkCompleted}
                        key={index} 
                        todo={todo}
                        idx={index}
                        edtItem={edtItem}
                        status = {status}
                    />
                ))
            }
        </ul>
    );
}

const Todo = ({todo, idx, todoOnClick, todoOnDeleteClick, edtItem}) => {
    const [visible, setVisible] = useState(true);
    const [valueEdit, setValueEdit] = useState(todo.get('text'));
    

    const handleOnClick = (idx) => {
        if(!todoOnClick) return;
        const data = todo.setIn(['status'],todo.get('status') !== 'Completed' ? 'Completed' : 'Active');
        todoOnClick(data, idx);
    }

  const handleRemoveItem = (idx) => {
        if(!todoOnDeleteClick) return;
        const id = todo.get('id')
        const data = {id, idx }
        todoOnDeleteClick(data);
    }

    const handleOnDblClick = () => {
        setVisible(!visible);
    }

    const handleOnChange = e => {
        setValueEdit(e.target.value);
    }
    const handleOnBlur = () => {
        setVisible(!visible);
    }
    const handleOnSubmit = e => {
        e.preventDefault();
        const id = todo.get('id')
        const formValueEdited = {
            id,
            text: valueEdit,
            status: todo.get('status')
        }
        if(!edtItem) return;
        edtItem(formValueEdited, idx, id);
        setVisible(!visible);
    }
    
    return (
        <li
            className={classnames ({
                "todo-item": true,
                Completed : todo.get('status') === "Completed"
            })}
        >
            {
                visible ? <span
                    onDoubleClick={() => (handleOnDblClick(todo))} 
                    onClick={() => handleOnClick(idx)}
                >
                    {todo.get('text')}
                </span>
                :
                <form onSubmit={handleOnSubmit}>
                    <input
                    className="edit"
                    type="text"
                    value={valueEdit}
                    onBlur={handleOnBlur}
                    onChange={handleOnChange}
                    />
                </form>
            }           
            <button 
                onClick={() => handleRemoveItem(idx)}
                >
                x
            </button>            
        </li>
    );
}

const mapStateToProps = (state, props) => {
    return {
        todo: getVisibleTodos(state, props)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkCompleted: (data,idx) => dispatch(checkCompleted(data,idx)),
        removeTodo: idx => dispatch(removeTodo(idx)),
        edtItem: (formValueEdited, idx, id) => dispatch(edtItem(formValueEdited, idx, id)), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);