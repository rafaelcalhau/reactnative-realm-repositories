import { all, takeLatest } from 'redux-saga/effects'
import * as AppSagas from './ducks/app/sagas'
import { ActionTypes as AppTypes } from './ducks/app/types'

export default function * rootSaga () {
  return yield all([
    takeLatest(AppTypes.LOAD, AppSagas.loadRepositories),
    takeLatest(AppTypes.SAVE, AppSagas.saveRepository)
  ])
}
