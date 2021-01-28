import React from 'react' 
import { StyleSheet, Text, View } from 'react-native'
import {Button, Input, Image} from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'

const LoginScreen = () => {
    return (
        <View>
            <StatusBar style='light'/>
            <Text>I am the login screen yo</Text>
            <Image source={{
                uri: 'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png',
            }}
            style={{width: 200, height: 200}}
            />
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})
