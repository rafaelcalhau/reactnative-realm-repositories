import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  Container,
  Description,
  Left,
  Name,
  Refresh,
  Right,
  Stat,
  StatName,
  Stats
} from './styles'

export default function Repository ({ data, loading, onRefresh }) {
  return (
    <Container>
      <Name>{data.name}</Name>
      <Description>{data.description}</Description>
      <Stats>
        <Left>
          <Stat>
            <Icon color='#444' name='star' size={20} />
            <StatName>{data.stars}</StatName>
          </Stat>

          <Stat>
            <Icon color='#444' name='code-fork' size={20} />
            <StatName>{data.forks}</StatName>
          </Stat>
        </Left>
        <Right>
          <Refresh onPress={onRefresh}>
            <Icon color={!loading ? '#4B4A67' : '#DDD'} name='refresh' size={20} />
          </Refresh>
        </Right>
      </Stats>
    </Container>
  )
}
