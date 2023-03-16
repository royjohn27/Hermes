import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { db } from '../Firebase';
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from 'react-native-elements';

const AddChatScreen = ({ navigation }) => {

    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a New Chat"
        });
    }, [navigation]);

    const createChat = async () => {
        await db.collection("chats").add({ chatName: input })
            .then(() => {
                navigation.goBack();

            })
            .catch((error) => alert(error))
    }
    return (

        <View style={styles.container}>
            <Input
                placeholder='Enter a chat name'
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon name='wechat'
                        type="antdesgin"
                        size={24}
                        color="black"
                    />
                }
            />

            <Button
                disabled={!input}
                onPress={createChat} title="Create a new Chat" />

        </View>
    );
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%",
    }

})