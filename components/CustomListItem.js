import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import { useState } from 'react'
import { useEffect } from 'react'
import { db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
    const [chatMessages, setChatMessages] = useState([])
    useEffect(() => {
        const unsubscribe = db.collection("chats")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot
    })
    return (
        <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)
        }>
            <Avatar rounded
                source={{
                    uri:
                        chatMessages?.[0]?.photoURL ||
                        "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
                }}

            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem >
    )
}

export default CustomListItem

const styles = StyleSheet.create({})