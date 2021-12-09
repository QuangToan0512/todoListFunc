import {ADD_TODO_SAGA, CHECK_COMPLETED_TODO_SAGA , CLEAR_COMPLETED_TODO_SAGA, EDIT_TODO_SAGA, GET_LIST, REMOVE_TODO_SAGA } from "../constants/actionsTypes"

export const getList = (todo) => {
    return {
        type: GET_LIST,
        payload: todo
    }
}

export const addTodoList = (todo) => {
    return {
        type: ADD_TODO_SAGA,
        payload: todo
    }
}
export const removeTodo = (data) => {
    return {
        type: REMOVE_TODO_SAGA,
        payload: data
    }
}

export const checkCompleted = (data,idx) => {
    return {
        type: CHECK_COMPLETED_TODO_SAGA,
        payload: {data, idx}
    }
}

export const edtItem = (formValueEdited, idx, id) => {
    return {
        type: EDIT_TODO_SAGA,
        payload: {formValueEdited, idx, id}
    }
}

export const clearCompletedItem = (arr) => {
    return {
        type: CLEAR_COMPLETED_TODO_SAGA,
        payload: arr
    }
}
