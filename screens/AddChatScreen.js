import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button, Input} from 'react-native-elements'

const AddChatScreen = ({navigation}) => {
    const [input, setInput]=useState('')

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: 'Add a new chat',
            headerBackTitle: 'Chats'
        })
    },[navigation])

    return (
        <View style={styles.container}>
            <Input placeholder='Enter a chat name'/>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {

    }
})
