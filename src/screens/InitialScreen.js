import React, { useState, useEffect } from 'react';
import { View, Text, Button, Platform, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { styles } from '../styles/styles';
import { MerchantParams, Constants } from '../utils/AvenuesParams';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import qs from 'querystring';
import { RNRSA } from 'react-native-rsa-native';

function InitialScreen({ route, navigation }) {

    const [netInfo, setNetInfo] = useState('');
    useEffect(() => {
        // Subscribe to network state updates
        const unsubscribe = NetInfo.addEventListener((state) => {
            // console.log("Connection type", state.type);
            // console.log("Is connected?", state.isConnected);
        });

        return () => {
            // Unsubscribe to network state updates
            unsubscribe();
        };
    }, []);

    NetInfo.fetch().then(state => {
        // console.log("Connection type", state.type);
        setNetInfo(state.isConnected);
        // console.log("netInfo Is connected?", netInfo);
    });

    var num = Math.floor(Math.random() * 9999999) + 1;

    const [accessCode, setAccessCode] = useState(MerchantParams.access_code);
    const [merchantId, setMerchantId] = useState(MerchantParams.merchant_id);
    const [orderId, setOrderId] = useState(`${num}`);
    const [currency, setCurrency] = useState(MerchantParams.currency);
    const [amount, setAmount] = useState('1.00');
    const [redirectUrl, setRedirectUrl] = useState(MerchantParams.redirect_url);
    const [cancelUrl, setCancelUrl] = useState(MerchantParams.cancel_url);
    const [rsaUrl, setRsaUrl] = useState(MerchantParams.rsa_key_url);

    const buttonPay = () => {

        if (netInfo === false) {
            alert('Sorry! Please check your internet connection');
            return;
        } else {

            let params = {
                access_code: accessCode,
                order_id: orderId
            };
            // console.log('params selected :', params);

            var config = {
                method: 'post',
                url: rsaUrl,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: qs.stringify(params)
            };
            // console.log('config selected :', config);
            axios(config)
                .then(response => {
                    const rsa_response = response.data;
                    // const rsa_response = JSON.stringify(response.data);
                    // console.log('RSA response : ', rsa_response);

                    const publicKey = rsa_response.trim();

                    const paramText = {
                        amount: amount,
                        currency: currency
                    };

                    // console.log('the paramText are : ', paramText);
                    // console.log(`the paramText with qs are ${qs.stringify(paramText)}`);


                    // encrypt paramText using publicKey (response from axios)
                    RNRSA.encrypt(qs.stringify(paramText), publicKey).then(
                        encodedMessage => {
                            // console.log(`the encoded message is ${encodedMessage}`);
                            let encVal = encodedMessage;

                            // navigate to WebView
                            navigation.navigate('WebView', {

                                trans_urlOBJ: Constants.TRANS_URL,
                                access_codeOBJ: accessCode,
                                merchant_idOBJ: merchantId,
                                order_idOBJ: orderId,
                                currencyOBJ: currency,
                                amountOBJ: amount,
                                redirect_urlOBJ: redirectUrl,
                                cancel_urlOBJ: cancelUrl,
                                enc_valOBJ: encVal
                            })

                        },
                        error => {
                            console.log('RNRSA.encrypt  error :', error);
                        },
                    );
                })
                .catch(error => console.log('RSA Axios error : ', error));
        }

    }



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.Scroll}>
                <View style={styles.center}>


                    <Text style={styles.headerText}>MERCHANT DETAILS</Text>
                    <View style={styles.divider} />
                    <View style={styles.inputContainer}>
                        <Text>Access Code</Text>
                        <TextInput
                            placeholder="Access Code"
                            style={styles.input}
                            value={accessCode}
                            onChangeText={text => setAccessCode(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>Merchant Id</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Merchant Id"
                            value={merchantId}
                            onChangeText={text => setMerchantId(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>Order Id</Text>
                        <TextInput
                            placeholder="Order Id"
                            style={styles.input}
                            value={orderId}
                            onChangeText={text => setOrderId(text)}
                            l̥
                        /></View>

                    <View style={styles.inputContainer}>
                        <Text>Currency</Text>
                        <TextInput
                            placeholder="Currency"
                            style={styles.input}
                            value={currency}
                            onChangeText={text => setCurrency(text)}

                        /></View>
                    <View style={styles.inputContainer}>
                        <Text>Amount</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Amount"
                            value={amount}
                            onChangeText={text => setAmount(text)}

                        /></View>
                    <View style={styles.inputContainer}>
                        <Text>Redirect url</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Redirect url"
                            value={redirectUrl}
                            onChangeText={text => setRedirectUrl(text)}

                        /></View>
                    <View style={styles.inputContainer}>
                        <Text>Cancel url</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Cancel url"
                            value={cancelUrl}
                            onChangeText={text => setCancelUrl(text)}

                        /></View>
                    <View style={styles.inputContainer}>
                        <Text>RSA url</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="RSA url"
                            value={rsaUrl}
                            onChangeText={text => setRsaUrl(text)}

                        />
                    </View>

                    {
                        Platform.select({
                            ios:
                                <Button
                                    style={styles.button}
                                    title='Pay'
                                    onPress={buttonPay}
                                />,
                            android:
                                <TouchableOpacity style={styles.button} onPress={buttonPay}>
                                    <Text style={styles.androidButtonText}>Pay</Text>
                                </TouchableOpacity>
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );


}

export default InitialScreen;