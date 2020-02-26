import { put } from 'redux-saga/effects'
import { createdRepo, reposLoaded, updatedRepo } from './actions'
import getRealm from '../../../services/realm'

export function * loadRepositories () {
  try {
    const realm = yield getRealm()
    // console.log(realm.path)
    const data = yield realm.objects('Repository').sorted('stars', true)
    const payload = Array.from(data).map(item => ({
      id: item.id,
      name: item.name,
      fullName: item.fullName,
      description: item.description,
      stars: item.stars,
      forks: item.forks
    }))

    yield put(reposLoaded(payload))
  } catch (e) {
    console.log('@Exception:' + e)
  }
}

export function * saveRepository (action) {
  const { data, isUpdate } = action.payload

  try {
    const realm = yield getRealm()
    const repo = yield new Promise((resolve, reject) => {
      realm.write(async () => {
        const item = await realm.create('Repository', data, isUpdate ? 'modified' : 'never')

        resolve({
          id: item.id,
          name: item.name,
          fullName: item.fullName,
          description: item.description,
          stars: item.stars,
          forks: item.forks
        })
      })
    })

    if (!isUpdate) {
      yield put(createdRepo(repo))
    } else {
      yield put(updatedRepo(repo))
    }
  } catch (e) {
    console.log('@Exception:' + e)
  }
}
