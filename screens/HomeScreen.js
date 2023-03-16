import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import CustomListItem from '../components/CustomListItem';
import { Avatar } from 'react-native-elements';
import { auth, db } from "../Firebase";
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';


const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([])
    const signOutUSer = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        });
    };
    useEffect(() => {
        const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
            setChats(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()

                }))
            )
        );
        return unsubscribe;
    }, [])
    useLayoutEffect(() => {

        navigation.setOptions({
            title: "Hermes",
            headerStyle: { backgroundColor: "black" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",

            headerLeft: () => (
                <View style={{ marginLeft: 50 }}>
                    <TouchableOpacity onPress={signOutUSer} activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>

            ),
            headerRight: () => (

                <View

                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight: 20,
                    }}
                >
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="white" />

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("AddChat")}

                        activeOpacity={0.5}>
                        <SimpleLineIcons name='pencil' size={24} color="white" />
                    </TouchableOpacity>
                </View >
            ),


        });
    }, []);
    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", { id, chatName })
    }
    return (
        <SafeAreaView>
            <ScrollView>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem key={id} id={id} chatName={chatName}
                        enterChat={enterChat} />

                ))}

            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen

const styles = StyleSheet.create({})