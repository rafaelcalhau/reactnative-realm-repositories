import React, { useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Container, Form, Input, List, Submit, Title } from './styles'
import Repository from './components/Repository'
import api from './services/api'
import getRealm from './services/realm'

const App = () => {
  const [error, setError] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState([])
  const [repos, setRepos] = useState([])

  // async function deleteRepositories () {
  //   const realm = await getRealm()
  //   return realm.write(() => realm.deleteAll())
  // }

  async function loadRepositories () {
    const realm = await getRealm()
    const list = realm.objects('Repository').sorted('stars', true)

    setRepos(list)
  }

  async function saveRepository (repo) {
    const data = {
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count
    }

    const realm = await getRealm()

    realm.write(async () => {
      const repo = await realm.create('Repository', data, 'modified')
      const list = [...repos]
      const index = list.findIndex(i => i.id === repo.id)

      if (index > -1) {
        list[index] = data
        setRepos(list)
      } else {
        list.push(repo)
        list.sort((a, b) => a.stars < b.stars)
        setRepos(list)
      }
    })

    return data
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
      const data = await saveRepository(response.data)

      setRepos(repos.map(item => item.id === data.id ? data : item))
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

export default App
