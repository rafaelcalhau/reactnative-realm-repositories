import { ActionTypes } from './types'

export const saveRepo = (payload) => {
  return { type: ActionTypes.SAVE, payload }
}

export const createdRepo = (payload) => {
  return { type: ActionTypes.CREATED, payload }
}

export const loadRepos = () => {
  return { type: ActionTypes.LOAD }
}

export const reposLoaded = payload => {
  return { type: ActionTypes.LOADED, payload }
}

export const updateRepo = (payload) => {
  return { type: ActionTypes.UPDATE, payload }
}

export const updatedRepo = (payload) => {
  return { type: ActionTypes.UPDATED, payload }
}
