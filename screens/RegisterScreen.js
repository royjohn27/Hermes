import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { auth, firebase } from "../Firebase"

const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");


    const register = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",


                })
            })
            .catch((error) => alert(error.message));
    };
    return (
        <View style={styles.container}>
            <Text h4 style={{ marginBottom: 50 }}>
                Create A new Hermes account Here.

            </Text>

            <View style={styles.inputContainer}>
                <Input
                    placeholder="Name"
                    autofocus
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)}

                />
                <Input
                    placeholder="Email"

                    type="text"
                    value={email}
                    onChangeText={(text) => setEmail(text)}

                />

                <Input
                    placeholder="Password"
                    type="password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}

                />
                <Input placeholder="profile picture URL(optional)"
                    type="text"
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}


                />
            </View>
            <Button
                containerStyle={styles.Button}
                raised
                onPress={register}
                title="Register"

            />
        </View>
    )

}
export default RegisterScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    Button: {
        width: 200,
        marginTop: 10,

    },
    inputContainer: {
        width: 300,
    }

});
