import React, {useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import { fromJS } from 'immutable';

Header.propTypes = {
    addTodo: PropTypes.func
};

function Header({addTodo}) {
    const [value, setValue] = useState('');

    const handleOnSubmit = e => {
        e.preventDefault();
        if(!addTodo) return;

        const formValue = {
            id: new Date().valueOf(),
            text: value
        }
        addTodo(fromJS(formValue));
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

export default Header; 