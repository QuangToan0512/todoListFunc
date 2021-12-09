import { all } from "@redux-saga/core/effects";
import { fetchTodo,  watchAddTodo, watchCheckCompleted, watchClearCompletedTodo, watchEditTodo, watchRemoveTodo } from "./todoSaga";

function* rootSaga() {
    yield all([fetchTodo(), watchAddTodo(), watchRemoveTodo(), watchCheckCompleted(), watchEditTodo(), watchClearCompletedTodo()])
}

export default rootSaga