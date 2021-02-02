import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { StyleSheet,ScrollView, Text, View, TextInput } from 'react-native'
import { Avatar } from 'react-native-elements'
import {AntDesign, FontAwesome, Ionicons} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { Keyboard } from 'react-native'
import { auth, db } from '../firebase'
import * as firebase from 'firebase'

const ChatScreen = ({navigation, route}) => {

    const [input, setInput] = useState('')
    const [messages, setMessages]= useState([])

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: 'Chat',
            headerBackTitleVisible: false,
            headerTitleAlign: 'left',
            headerTitle: ()=>(
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <Avatar rounded source={{
                        uri: 'https:cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'
                    }}/>
                    <Text style={{color: 'white', marginLeft: 10, fontWeight:'700'}}>{route.params.chatName}</Text>
                </View>
            ),
            headerLeft: ()=>(
                <TouchableOpacity style={{marginLeft: 10}} onPress={navigation.goBack}>
                    <AntDesign name='arrowleft' size={24} color='white'/>
                </TouchableOpacity>
            ),
            headerRight: ()=>(
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 20
                }}>
                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={24} color='white'/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name='phone' size={24} color='white'/>
                    </TouchableOpacity>
                </View>
            )
        })
    },[navigation])

    useEffect(()=>{
        const unsubscribe=db.collection('chats').doc(route.params.id).collection('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot)=>setMessages(
            snapshot.docs.map(doc=>({
                id: doc.id,
                data: doc.data()
            }))
        ))

        return ()=>unsubscribe()
    },[route])

    const sendMessage=()=>{
        Keyboard.dismiss();

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        setInput('')
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <StatusBar style='light'/>
            <KeyboardAvoidingView
                behavior={Platform.OS==='ios'?'padding':'height'}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                    <ScrollView>
                        {messages.map((message)=>(
                            message.data.email===auth.currentUser.email?(
                                <View key={id} style={styles.receiver}>
                                    <Avatar />
                                    <Text style={styles.receiverText}>{message.data.message}</Text>
                                </View>
                            ):(
                                <View style={styles.sender}>
                                     <Avatar />
                                    <Text style={styles.senderText}>{message.data.message}</Text>
                                </View>
                            )
                        ))}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput value={input} onChangeText={text=>setInput(text)} onSubmitEditing={sendMessage} placeholder='Signal Message' style={styles.textInput}/>
                        <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}> 
                            <Ionicons name='send' size={24} color='#2B68E6'/>
                        </TouchableOpacity>
                    </View>
                </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15,
    },
    textInput:{
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#ECECEC',
        padding: 10,
        color: 'grey',
        borderRadius: 30,
    }
})
