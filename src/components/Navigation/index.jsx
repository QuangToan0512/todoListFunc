import React from 'react';
import './styles.scss'
import {Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Navigation(props) {
    return (
        <Nav className= "nav">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/todoList">TodoList</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </Nav>
    );
}

export default Navigation;