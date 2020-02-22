import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import GradientView from 'react-native-linear-gradient'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export const Container = styled(GradientView).attrs({
  colors: ['#4B4A67', '#232233'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 }
})`
  flex: 1;
  padding-top: ${getStatusBarHeight(true) + 30}px
`

export const Form = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 20px;
`

export const List = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 20
  }
})``

export const Input = styled.TextInput`
  background-color: #FFF;
  border: 2px solid ${({ error }) => !error ? '#FFF' : 'red'};
  border-radius: 4px;
  flex: 1;
  padding: 20px;
  font-size: 18px
`

export const Submit = styled.TouchableOpacity`
  align-items: center;
  background-color: orange;
  border-radius: 4px;
  margin-left: 10px;
  min-width: 60px;
  justify-content: center
`

export const Title = styled.Text`
  color: white;
  font-size: 26px;
  font-weight: bold;
  padding: 0 20px;
  margin-bottom: 20px
`
