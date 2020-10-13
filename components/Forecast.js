import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WEATHER_API_KEY } from 'react-native-dotenv'
import * as Location from 'expo-location'

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/forecast?'

export default function Forecast() {
    const [fiveDay, setFiveDay] = useState({list: [{main: null}]})
    const [errorMessage, setErrorMessage] = useState(null)
    // const [unitsSystem, setUnitsSystem] = useState('imperial')

    // const {
    //     list: [details]
    // } = fiveDay

    // const {main: {temp}, dt} = details

    // console.log('this is', fiveDay.list[1].dt)
    // let dayOfWeek = new Date(fiveDay.list[1].dt * 1000)
    // let nameofDay = dayOfWeek.getMonth() + 1


    useEffect(() => {
        load()
      }, [])

      async function load() {
        setErrorMessage(null)
        try {

          let { status } = await Location.requestPermissionsAsync()

          if (status !== 'granted') {
            setErrorMessage('Try again')
            return
          }
          const location = await Location.getCurrentPositionAsync()

          const { latitude, longitude } = location.coords

          const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=imperial&appid=${WEATHER_API_KEY}`


          const response = await fetch(weatherUrl)

          console.log(weatherUrl)

          const result = await response.json()

          console.log('test', result.list[0].main.temp)


          if(response.ok) {

            const days = {list: []}

            for(let i = 0; i < result.list.length; i++) {
                if(i === 0){

                        days.list.push(result.list[i])

                    } else {
                        let lastI = i - 1
                        let equals = new Date(result.list[lastI].dt * 1000).getDate() === new Date(result.list[i].dt * 1000).getDate()

                        if(!equals) {
                        days.list.push(result.list[i])
                    }
                }
            }


            setFiveDay(days)

          } else {
            setErrorMessage(result.message)
          }
        } catch(error) {
          setErrorMessage(error.message)
        }
    }

    // let date = new Date ()


    return (
        <View style={styles.container}>
            {fiveDay.list.map(day => (
                <View style={styles.forecastBox}>
                 <View style={styles.forecastRow}>
                     <Text>{day.main.temp_max}</Text>
                 </View>
             </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        top: 30,
        borderRadius: 10,
        backgroundColor: '#A3AAAE',
        shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 11,
    },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,

        elevation: 22,
    },

    forecastBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1
    },
    forecastRow: {
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRightWidth: 1,
        flex: 1
    }
})
