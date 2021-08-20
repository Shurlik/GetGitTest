import React from "react";
import { Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

const SearchHistory = ({ historyList }) => {
    return (
        <View style={styles.history}>
            {historyList.map((listItem, index) => (
                <Text style={styles.historyItem} key={index}>
                    {listItem}
                </Text>
            ))}
        </View>
    );
};

export default SearchHistory;

const styles = ScaledSheet.create({
    history: {
        width: "100%",
    },
    historyItem: {
        color: "#fff",
        fontSize: "16@s",
        paddingVertical: "3@vs",
    },
});
