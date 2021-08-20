import React, { useState, useEffect } from "react";
import { View, TextInput, Text } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import * as SecureStore from "expo-secure-store";

import SearchHistory from "../components/SearchHistory";
import OutputData from "../components/OutputData";
import { saveData, setLoaded, setText } from "../store/data/actions";
import { useDispatch, useSelector } from "react-redux";

const MainScreen = () => {
    const [history, setHistory] = useState([]);
    const dispatch = useDispatch();
    const loaded = useSelector((state) => state.data.loaded);
    const value = useSelector((state) => state.data.text);

    const API = "https://api.github.com/search/repositories?q=";

    async function storeDataInLS(key, value) {
        try {
            const jsonValue = JSON.stringify(value);
            await SecureStore.setItemAsync(key, jsonValue);
        } catch (e) {
            console.error(e);
        }
    }

    async function getDataFromLS(key) {
        try {
            let jsonValue = await SecureStore.getItemAsync(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error(e);
        }
    }

    async function getData() {
        dispatch(setLoaded(false));
        try {
            const res = await fetch(API + value + "&1");
            const resJson = await res.json();
            dispatch(saveData(resJson.items));
        } catch (error) {
            console.warn(error);
        }
        dispatch(setLoaded(true));
    }
    const historyHandler = async (item) => {
        if (history.length < 5) {
            history.unshift(item);
        } else {
            history.unshift(item);
            history.pop();
        }
        storeDataInLS("history", history);
        setHistory([...history]);
    };

    const onChangeHandler = (text) => {
        dispatch(setText(text.trim()));
        debounce(getData(), 500);
        historyHandler(text.trim());
    };

    const debounce = (f, ms) => {
        let isCooldown = false;
        return function () {
            if (isCooldown) return;
            f.apply(this, arguments);
            isCooldown = true;
            setTimeout(() => (isCooldown = false), ms);
        };
    };

    useEffect(() => {
        getDataFromLS("history").then((res) => {
            setHistory(res);
        });
    }, []);

    return (
        <View style={styles.screen}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder={"Input your text"}
                    placeholderTextColor="rgba(0,0,0,0.3)"
                    value={value}
                    onChangeText={(text) => onChangeHandler(text)}
                />
            </View>
            <Text style={styles.historyTitle}>Search history:</Text>
            {history.length !== 0 && history !== null && (
                <SearchHistory historyList={history} />
            )}
            {loaded && <OutputData />}
        </View>
    );
};

export default MainScreen;

const styles = ScaledSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#3a4047",
        color: "#fff",
        paddingHorizontal: "20@s",
    },
    inputContainer: {
        marginTop: "30@vs",
        width: "100%",
        justifyContent: "center",
    },
    textInput: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        width: "100%",
        height: "50@vs",
        padding: 15,
        overflow: "hidden",
        color: "#000",
        backgroundColor: "#fff",
    },
    historyTitle: {
        marginVertical: "20@vs",
        fontSize: "18@s",
        color: "#fff",
        alignSelf: "flex-start",
    },
});
