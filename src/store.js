import createSagaMiddleware from "@redux-saga/core";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware(); // create a middleware 
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)) // connect middleware to store 
sagaMiddleware.run(rootSaga); // start sagas

export default store