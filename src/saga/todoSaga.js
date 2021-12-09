import todoApi from "../api/todoApi";
import {put, take, call} from 'redux-saga/effects';
import { ADD_TODO, ADD_TODO_SAGA, CHECK_COMPLETED_TODO, CHECK_COMPLETED_TODO_SAGA, CLEAR_COMPLETED_TODO, CLEAR_COMPLETED_TODO_SAGA, EDIT_TODO, EDIT_TODO_SAGA, GET_LIST, REMOVE_TODO, REMOVE_TODO_SAGA } from "../constants/actionsTypes";
import { fromJS } from "immutable";


//Get Todo
export function* fetchTodo() {
    const {data} = yield todoApi.getAll() 
    yield put({type: GET_LIST, payload: data})
}

//Add Todo
export function* watchAddTodo() {
    while(true) {
        const action = yield take(ADD_TODO_SAGA)
        const {payload} = action
        yield call(workerAddTodo, payload)
    }
}

export function* workerAddTodo(payload) {
    const {data} = yield todoApi.add(payload)
    yield put({type: ADD_TODO, payload:fromJS(data)});
}

//Remove Todo

export function* watchRemoveTodo() {
    while(true) {
        const action = yield take(REMOVE_TODO_SAGA)
        yield call(workerRemoveTodo, action)
    }
}

export function* workerRemoveTodo(action) {
    yield todoApi.remove(action.payload.id)
    yield put({type: REMOVE_TODO, payload: action.payload.idx})
}

//Check Completed Todo
export function* watchCheckCompleted() {
    while(true) {
        const action = yield take(CHECK_COMPLETED_TODO_SAGA)
        yield call(workerCheckCompleted, action)
    }
}

export function* workerCheckCompleted(action) {
    const {data, idx} = action.payload;
    yield todoApi.edit(data, data.get('id'))
    yield put({type: CHECK_COMPLETED_TODO, payload: idx})
}

// Edit Todo
export function* watchEditTodo() {
    while(true) {
        const action = yield take(EDIT_TODO_SAGA)
        yield call(workerEditTodo, action)
    }
}

export function* workerEditTodo(action) {
    const {formValueEdited,id} = action.payload;
    yield todoApi.edit(formValueEdited, id)
    yield put({type: EDIT_TODO, payload: action.payload})
}

// CheckCompleted Todo
export function* watchClearCompletedTodo() {
    
    while(true) {
        const action = yield take(CLEAR_COMPLETED_TODO_SAGA)
        yield call(workerClearCompletedTodo, action)
    }
}

export function* workerClearCompletedTodo(action) {
    const arr = action.payload  
        yield arr.forEach(element => {
            todoApi.remove(element.id)
    });
    yield put({type: CLEAR_COMPLETED_TODO})
}


