import React from "react";
import { Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

const ListItem = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.itemHeader}>{props.item.name}</Text>
            <View style={styles.textContent}>
                <Text style={styles.key}>Language:&nbsp;</Text>
                <Text style={styles.value}>{props.item.language}</Text>
            </View>
            <View style={styles.textContent}>
                <Text style={styles.key}>Description:&nbsp;</Text>
                <Text style={styles.value}>{props.item.description}</Text>
            </View>
        </View>
    );
};

export default ListItem;

const styles = ScaledSheet.create({
    container: {
        backgroundColor: "#fff",
        justifyContent: "space-around",
        borderRadius: 15,
        paddingHorizontal: "25@s",
        marginVertical: "10@vs",
    },
    textContent: {
        flexDirection: "row",
        marginVertical: '10@vs'
    },
    itemHeader:{
        marginVertical: '20@vs',
        fontWeight: 'bold',
        fontSize: 18
    },
    value: {
        flexShrink: 1,
        fontWeight: 'bold'
    }
});
