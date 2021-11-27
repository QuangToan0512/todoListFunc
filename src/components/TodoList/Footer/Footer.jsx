import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

Footer.propTypes = {
};

function Footer({ status, setFilterStatus, numOfTodoItemCompleted, clearCompleted}) {
    const filterBtns = [
        {   
            isActive : status === 'All',
            title: "All",
            onClick:() => setFilterStatus('All')
        },
        {   
            isActive : status === 'Active',
            title: "Active",
            onClick: () => setFilterStatus('Active')
        },
        {   
            isActive : status === 'Completed',
            title: "Completed",
            onClick: ()=> setFilterStatus('Completed')
        }
    ]
    
    return (
        <div className="footer">
            <ul className="filters" >
                {
                    filterBtns.map((btn, idx) => (
                        <Btns 
                            key={idx}
                            {...btn}
                        />             
                    ))
                }
            </ul>
            { 
                numOfTodoItemCompleted > 0 && 
                <button
                    className="clear-completed"
                    onClick={clearCompleted}
                    >   
                    Clear Completed
                </button>  
            }
        </div>
        
    );
}

const Btns = ({title, onClick, isActive}) => {  
    return (
        <li>
            <button
                className={classnames(
                    isActive ? "selected" : ""
                )}
                onClick={onClick}
            >
                {title}
            </button>
        </li>
    )
}

export default Footer;