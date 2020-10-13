import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WEATHER_API_KEY } from 'react-native-dotenv'
import * as Location from 'expo-location'

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/forecast?'

export default function Forecast({ unitsSystem }) {
    const [fiveDay, setFiveDay] = useState({list: [{main: null}]})
    const [errorMessage, setErrorMessage] = useState(null)

    // const {
    //     list: [details]
    // } = fiveDay

    // const {main: {temp}, dt} = details


    // let dayOfWeek = new Date(fiveDay.list[1].dt * 1000)
    // let xx = new Date()
    // document.write(xx.toUTCString())
    // console.log(xx)

    // let dates = []

    // for (let i = 1; i < fiveDay.list[].length; i++) {
    //     dates.push(fiveDay.list[i].dt)
    // }


    // let timestamp = fiveDay.list[1].dt
    // let a = new Date(timestamp * 1000)
    const week = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
    // let dayOfWeek = week[a.getDay()]

    // console.log(timestamp)



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

          const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

          console.log(unitsSystem)


          const response = await fetch(weatherUrl)

          console.log(weatherUrl)

          const result = await response.json()

          console.log('test', result.list[0].main.temp)


          if(response.ok) {

            const days = {list: []}

            // loop through every item in the result object
            for(let i = 0; i < result.list.length; i++) {
                // if index isnt equal to 0 move to comapring
                // index 0 is always current day so skip
                if(i !== 0){
                    // making sure we have prev Index for comparing
                    let lastI = i - 1
                    // lastI get plugs into result to get date of prev Index
                    let prevDay = new Date(result.list[lastI].dt * 1000).getDay()
                    // same as lastI but for current index
                    let currentDay = new Date(result.list[i].dt * 1000).getDay()
                    // comparare if the prev dt doesnt = current date
                    if(prevDay !== currentDay) {
                        console.log('this is i', i)
                        // getting current index of new object
                        let dayI = days.list.length
                        // getting index by comparing before result is pushed into new object
                        days.list.push(result.list[i])
                        // changes unix number for date to human readable
                        let formatDay = week[currentDay]
                        // fd adds new key to format day
                        days.list[dayI].fd = formatDay
                        console.log(days.list[dayI].fd)
                    }
                }
            }

            console.log(days.list.length)
            setFiveDay(days)

          } else {
            setErrorMessage(result.message)
          }
        } catch(error) {
          setErrorMessage(error.message)
        }
    }


    return (
        <View style={styles.container}>
            {fiveDay.list.map(day => (
                <View style={styles.forecastBox}>
                 <View style={styles.forecastRow}>
                     <Text>{day.fd}</Text>
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
