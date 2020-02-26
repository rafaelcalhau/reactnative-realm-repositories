import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Keyboard, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Container, Form, Input, List, Submit, Title } from './styles'
import Repository from './components/Repository'
import api from './services/api'
// import getRealm from './services/realm'
import { loadRepos, saveRepo } from './store/ducks/app/actions'

const Root = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState([])
  const repos = useSelector(state => state.data)

  const loadRepositories = () => dispatch(loadRepos())

  // async function deleteRepositories () {
  //   const realm = await getRealm()
  //   return realm.write(() => realm.deleteAll())
  // }

  async function saveRepository (repo, isUpdate = false) {
    const data = {
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count
    }

    dispatch(saveRepo({ data, isUpdate }))
  }

  async function handleNewRepository () {
    try {
      const response = await api.get(`/repos/${input}`)

      Keyboard.dismiss()
      saveRepository(response.data)
      setError(false)
      setInput('')
    } catch (ex) {
      console.log(ex)
      setError(true)
    }
  }

  async function handleRefresh (repo) {
    let loadingIndex = loading.indexOf(repo.id)

    if (loadingIndex > -1) {
      return
    }

    try {
      setLoading(items => [...items, repo.id])
      const response = await api.get(`/repos/${repo.fullName}`)
      await saveRepository(response.data, true)
      setError(false)
    } catch (ex) {
      console.log(ex)
      setError(true)
    }

    loadingIndex = loading.indexOf(repo.id)
    setLoading(loading.splice(loadingIndex, 1))
  }

  useEffect(() => {
    // deleteRepositories()
    loadRepositories()
  }, [])

  return (
    <>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Container
        contentInsetAdjustmentBehavior='automatic'
      >
        <Title>Repositórios</Title>

        <Form>
          <Input
            autoCapitalize='none'
            autoCorrect={false}
            error={error}
            placeholder='Adicione um repositório'
            onChangeText={setInput}
            value={input}
          />
          <Submit onPress={handleNewRepository}>
            <Icon color='#FFF' name='add' size={32} />
          </Submit>
        </Form>

        <List
          data={repos}
          keyboardShouldPersistTaps='handled'
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) =>
            <Repository
              data={item}
              loading={loading.indexOf(item.id) > -1}
              onRefresh={() => handleRefresh(item)}
            />}
          showsHorizontalScrollIndicator={false}
        />
      </Container>
    </>
  )
}

export default Root
