import React from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { ScaledSheet } from "react-native-size-matters";
import ListItem from "./ListItem";

const OutputData = () => {
    const data = useSelector((state) => state.data.data);
    return (
        <View style={styles.output}>
            <FlatList
                keyExtractor={(itemData) => itemData.id.toString()}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={(itemData) => <ListItem item={itemData.item} />}
            />
        </View>
    );
};

export default OutputData;

const styles = ScaledSheet.create({
    output: {
        width: "100%",
        flex: 1,
        marginTop: "20@vs",
        borderRadius: 15,
        overflow: "hidden",
    },
});
