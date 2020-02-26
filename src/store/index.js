import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import reducer from './ducks/app'
import sagas from './rootSaga'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(logger, sagaMiddleware))

sagaMiddleware.run(sagas)

export default store
