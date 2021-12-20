import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import classnames from 'classnames';
import { connect } from 'react-redux';
import { clearCompletedItem } from '../../../actions/todo';
import { filterbyStatus } from '../../../reselect/todoSelector';

Footer.propTypes = {
    todo: PropTypes.object,
    status: PropTypes.string,
    setFilterStatus: PropTypes.func,
    numOfTodoItemCompleted: PropTypes.number,
    clearCompleted: PropTypes.func
};

function Footer({ todo,status, setFilterStatus, clearCompletedItem}) {

    const numOfTodoItemCompleted= filterbyStatus(todo, "Completed").toJS().length
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
            onClick: ()=> 
                setFilterStatus('Completed')
        }
    ]
    const handleClearCompleted = () => {
        const arr = filterbyStatus(todo, 'Completed')
        clearCompletedItem(arr)
    }

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
                    onClick={handleClearCompleted}
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


const mapStateToProps = (state) => {
    return {
        todo: state.todo.get('todoList')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCompletedItem: (arr) => dispatch(clearCompletedItem(arr))   
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);