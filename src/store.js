import createSagaMiddleware from "@redux-saga/core";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const middlewares = sagaMiddleware;
const store = createStore(rootReducer, applyMiddleware(middlewares)) 
sagaMiddleware.run(rootSaga);

export default store