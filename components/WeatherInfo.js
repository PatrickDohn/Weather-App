import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { colors } from '../utils/index'
import Forecast from './Forecast'
// import moment from 'moment'

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors

function convertTime(unixTime){
    let dt = new Date(unixTime * 1000)
    let h = dt.getHours()
    let m = "0" + dt.getMinutes()
    let t = h + ":" + m.substr(-2)
    return t
}

export default function WeatherInfo({ currentWeather }) {
    const {
        main: {temp},
        weather: [details],
        name,
        sys
    } = currentWeather
    const { icon, main, description } = details

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`
    return (
        <View style={styles.weatherInfo}>
            <Text style={styles.textSecondary}>{name}</Text>
            <Image style={styles.weatherIcon} source={{ url: iconUrl }} />
            <Text style={styles.textPrimary}>{Math.floor(temp)}°</Text>
            <Text style={styles.weatherDescription}>{description}</Text>
            <Text style={styles.textSecondary}>{main}</Text>
            <Text style={styles.sunText}>Sunrise {convertTime(sys.sunrise)} AM | Sunset {convertTime(sys.sunset)} PM</Text>
            <Forecast />
        </View>
    )
}


const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center',
        top: 40
    },
    weatherIcon: {
        width: 100,
        height: 100
    },
    weatherDescription: {
        textTransform: 'capitalize'
    },
    textPrimary: {
        fontSize: 40,
        color: PRIMARY_COLOR,
        fontWeight: '600'
    },
    textSecondary: {
        fontSize: 20,
        color: SECONDARY_COLOR,
        fontWeight: '500',
        marginTop: 10
    },
    sunText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'white'
    }
})
