import React from 'react'
import { Provider } from 'react-redux'
import Root from './Root'
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  )
}

export default App
