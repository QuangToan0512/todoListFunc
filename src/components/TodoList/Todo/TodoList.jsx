import React, {useState} from 'react';
import './styles.scss'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Map} from 'immutable';
import todoApi from '../../../api/todoApi';
TodoList.propTypes = {
    todoList: PropTypes.object,
    todoOnClick: PropTypes.func,
    todoOnDeleteClick: PropTypes.func,
    edtItem: PropTypes.func
}

function TodoList({todoList, todoOnClick, todoOnDeletedClick, edtItem }) {
    return (
        <ul className="todo-list">
            {
                todoList.map((todo, index) => (
                   <Todo
                        todoOnDeleteClick={todoOnDeletedClick}
                        todoOnClick={todoOnClick}
                        key={index} 
                        todo={todo}
                        idx={index} 
                        todoList={todoList}
                        edtItem={edtItem} 
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
        todoOnClick(idx);
        setValueEdit(todo.get('text'));
        todo.setIn(['status'],todo.get('status') !== 'Completed' ? 'Completed' : 'Active');
        const data = todo.setIn(['status'],todo.get('status') !== 'Completed' ? 'Completed' : 'Active')
        todoApi.edit(data, todo.get('id'))
        // axios({
        //     method: 'PUT',
        //     url: `http://localhost:3000/todoList/${todo.get('id')}`,
        //     data: todo.setIn(['status'],todo.get('status') !== 'Completed' ? 'Completed' : 'Active')
        // })
    }

  const handleRemoveItem = (idx) => {
        if(!todoOnDeleteClick) return;
        todoOnDeleteClick(idx);
        todoApi.remove(todo.get('id'))
        // axios({
        //     method: 'DELETE',
        //     url: `http://localhost:3000/todoList/${todo.get('id')}`
        // })
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
        debugger
        e.preventDefault();
        const id = todo.get('id')
        const formValueEdited = Map({
            id,
            text: valueEdit,
            status: todo.get('status')
        })
        if(!edtItem) return;
        edtItem(formValueEdited, idx);
        setVisible(!visible);
        todoApi.edit(formValueEdited.toJS(), id)
        // axios({
        //     method: "PATCH",
        //     url: `http://localhost:3000/todoList/${id}`,
        //     data: formValueEdited.toJS()
        // })
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

export default TodoList;    