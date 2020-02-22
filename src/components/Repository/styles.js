import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: #FFF;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 10px;
`

export const Description = styled.Text.attrs({
  numberOfLines: 2
})`
  color: #555;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 10px
`

export const Left = styled.View`
  flex: 1;
  flex-direction: row;
`

export const Name = styled.Text`
  color: #333;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 5px
`

export const Refresh = styled.TouchableOpacity`
  padding: 10px 10px;
  justify-content: center
`

export const Right = styled.View`
  margin-left: 20px
`

export const Stat = styled.View`
  align-items: center;
  flex-direction: row;
  margin-right: 15px;
`

export const StatName = styled.Text`
  margin-left: 6px
`

export const Stats = styled.View`
  align-items: center;
  flex-direction: row;
  margin-top: 10px
`
