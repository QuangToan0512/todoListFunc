import React, {useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { addTodoList } from '../../../actions/todo';

Header.propTypes = {
    addTodo: PropTypes.func
};

function Header({addTodoList}) {
    const [value, setValue] = useState('');
    const handleOnSubmit = e => {
        e.preventDefault();
        if(!addTodoList) return;
        const formValue = {
            id: new Date().valueOf(),
            text: value,
            status: 'Active'
        }
        addTodoList(fromJS(formValue));
        setValue("");
    };
    
    const handleOnChange = (e) => {
        setValue(e.target.value);
    };
    return (
        <form 
            className="header"
            onSubmit={handleOnSubmit}
            >
            <input
                className="new-todo"
                type="text"
                placeholder="What needs to be done?"
                value={value}
                onChange={handleOnChange}
            />
        </form>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodoList: todo => dispatch(addTodoList(todo)),      
    }
}
export default connect(null,mapDispatchToProps)(Header)