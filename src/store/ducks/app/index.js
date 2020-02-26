import { ActionTypes } from './types'

const INITIAL_STATE = {
  data: [],
  error: null,
  loading: false
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.CREATED:
      return (function () {
        const data = [...state.data, action.payload]
        data.sort((a, b) => b.stars - a.stars)

        return { ...state, data, error: null, loading: false }
      }())

    case ActionTypes.LOAD:
      return { ...state, error: null, loading: true }

    case ActionTypes.LOADED:
      return { ...state, data: action.payload, error: null, loading: false }

    case ActionTypes.UPDATE:
      return { ...state, error: null, loading: true }

    case ActionTypes.UPDATED:
      return (function () {
        const data = [...state.data]
        const index = data.findIndex(i => i.id === action.payload.id)

        if (index === -1) {
          return state
        }

        data[index] = { ...data[index], ...action.payload }

        return { ...state, data, error: null, loading: false }
      }())

    default:
      return state
  }
}

export default reducer
