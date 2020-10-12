import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Forecast() {
    return (
        <View style={styles.container}>
            <View style={styles.forecastBox}>
                <View style={styles.forecastRow}>
                    <Text>Day1</Text>
                </View>
            </View>

            <View style={styles.forecastBox}>
                <View style={styles.forecastRow}>
                    <Text>Day1</Text>
                </View>
            </View>

            <View style={styles.forecastBox}>
                <View style={styles.forecastRow}>
                    <Text>Day1</Text>
                </View>
            </View>

            <View style={styles.forecastBox}>
                <View>
                    <Text>Day1</Text>
                </View>
            </View>
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
