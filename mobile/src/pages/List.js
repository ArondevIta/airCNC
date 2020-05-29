import React, { useState, useEffect } from 'react'
import { Alert, SafeAreaView, ScrollView, AsyncStorage, StyleSheet, Image, Text }  from 'react-native'

import socketio from 'socket.io-client'
import SpotList from '../components/SpotList'

import logo from '../assets/logo.png'

export default function List({navigation}){
  const [techs, setTechs] = useState([])

  useEffect(()=>{
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.1.107:3333', {
        query: { user_id }
      })

      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} na data de ${booking.date} foi ${booking.approved ? 'APROVADA': 'REJEITADA'}`)
      })
    })
  }, [])

  useEffect(()=>{
    AsyncStorage.getItem('techs').then(storagedTechs=> {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim())

      setTechs(techsArray)
    })
  }, [])

  return (
    <SafeAreaView style={styles.container} >
      <Image source={logo} style={styles.logo} />
      <ScrollView>
        {techs.map(tech=>(
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 50
  }
})
