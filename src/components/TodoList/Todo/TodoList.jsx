import React, {useState} from 'react';
import './styles.scss'
import PropTypes from 'prop-types';
import classnames from 'classnames';
TodoList.propTypes = {
    todoList: PropTypes.object,
    todoOnClick: PropTypes.func,
    todoOnDeleteClick: PropTypes.func,
    edtItem: PropTypes.func
}

function TodoList({todoList, todoOnClick, todoOnDeletedClick, edtItem }) {
    // debugger
    // const handleTodoOnClick = (idx) => {
    //     if(!todoOnClick) return;
    //     todoOnClick(idx);
    // } 

    // const handleTodoDeleteOnClick = todo => {
    //     if(!todoOnDeletedClick) return;
    //     todoOnDeletedClick(todo);  
    // }
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
    }

  const handleRemoveItem = idx => {
        if(!todoOnDeleteClick) return;
        todoOnDeleteClick(idx);
    }

    const handleOnDblClick = () => {
        setVisible(!visible);
    }

    const handleOnChange = e => {
        setValueEdit(e.target.value);
    }

    const handleOnBlur = () => {
        setVisible(!visible)
    }
    const handleOnSubmit = e => {
        e.preventDefault();
        const formValueEdited = Map({
            id: new Date().valueOf(),
            text: valueEdit
        })
        console.log(formValueEdited);
        if(!edtItem) return;
        edtItem(formValueEdited, idx);

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

export default TodoList;    