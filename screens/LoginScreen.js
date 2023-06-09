import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { auth } from '../Firebase';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        const unsbscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home")
            }
        });
        return unsbscribe;
    }, [])
    const signIn = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error));
    };
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')}
                style={{ width: 320, height: 140 }} />

            <View style={styles.inputContainer}>
                <Input placeholder='Email'
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signIn}

                />

            </View>
            <Button containerStyle={styles.Button} on onPress={signIn} title="Login" />
            <Button onPress={() => navigation.navigate("Register")}
                containerStyle={styles.Button}
                title="Register"
                type="outline"
            />
        </View >
    )
}
export default LoginScreen

const styles = StyleSheet.create({
    Button: { width: 200, marginTop: 10 },
    inputContainer: { width: 300 },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        padding: 10,
    }


});