import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {call, put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';


//  saga part 1/4
const sagaMiddleware = createSagaMiddleware();

function* firstSaga(action) {
    console.log('in first saga');
    try {
        const response = yield call(axios.get, '/api/element');
        yield put({ type: 'SET_ELEMENTS', payload: response.data });
    }
    catch (error) {
        console.log('error with element get request', error);
    }
}

function* addElementSaga(action) {
        console.log('Adding element');
    try {
        yield call(axios.post, '/api/element', action.payload);
        yield put( {type: 'FETCH_ELEMENTS'});
    }
    catch(error)  {
      console.log('error with addElementSaga get request', error);
    }
}

//  saga part 2/4
function* watcherSaga() {
    yield takeEvery('FETCH_ELEMENTS', firstSaga);
    yield takeEvery('POST_ELEMENTS', addElementSaga);
}

const elementListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ELEMENTS':
            console.log('SET_ELEMENTS in elementListReducer');
            return action.payload;
        default:
            return state;
    }
};    



// This is creating the store
// the store is the big JavaScript Object that holds all of the information for our application
const storeInstance = createStore(
    // This function is our first reducer
    // reducer is a function that runs every time an action is dispatched
    combineReducers({
        elementListReducer,
    }),
    applyMiddleware(
        sagaMiddleware,   //  saga part 3/4
        logger),
);

sagaMiddleware.run(watcherSaga);  //  saga Part 4/4

ReactDOM.render(<Provider store={storeInstance}><App/></Provider>, document.getElementById('root'));
