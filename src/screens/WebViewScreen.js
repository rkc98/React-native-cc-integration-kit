import React, { useState, useEffect } from 'react';
import { SafeAreaView, BackHandler, ActivityIndicator, Alert } from 'react-native';
import { styles } from '../styles/styles';
import { Constants } from '../utils/AvenuesParams';
import { WebView } from 'react-native-webview';
import qs from 'querystring';


function WebViewScreen({ route, navigation }) {

    const ActivityIndicatorLoadingView = () => {

        return (

            <ActivityIndicator
                color='#009688'
                size='large'
                style={styles.ActivityIndicatorStyle}
            />
        );
    }

    useEffect(() => {

        const backPressHandler = () => {

            let TransStatus = 'Transaction Closed.';
            // Put your own code here, which you want to execute on back button press.
            Alert.alert(
                '',
                'Do you really want to cancel this transaction?',
                [

                    { text: 'CANCEL', onPress: () => null },//console.log('NO Pressed') },
                    {
                        text: 'OK', onPress: () => {
                            //BackHandler.exitApp(); 
                            navigation.navigate('Initial', {
                                
                            });
                        }
                    }
                ],
                { cancelable: true },
            );

            // Return true to enable back button over ride.
            return true;
        }

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backPressHandler);

        return () => backHandler.remove();
    }, []);

    console.log('Params from Payment Option screen ', route.params);

    //mandatory params
    params = {
        access_code: route.params.access_codeOBJ,

        merchant_id: route.params.merchant_idOBJ,

        order_id: route.params.order_idOBJ,

        redirect_url: route.params.redirect_urlOBJ,

        cancel_url: route.params.cancel_urlOBJ,

        amount: route.params.amountOBJ,

        currency: route.params.currencyOBJ,

        enc_val: route.params.enc_valOBJ
    }

    payload = qs.stringify(params);


    const onNavigationStateChange = (navState) => {
        // console.log('WebView onNavigationStateChange url = ', navState.url);
         if (navState.url.includes('upi://pay?pa')) {
            Linking.openURL(navState.url).then(
                response => console.log(response),
                error => console.log(error),
            );
        }
    }

    const _onMessage = (event) => {

        var getData = event.nativeEvent.data;
        // console.log('handled _onMessage : ', getData);
        // console.log('trUrl status : ', trUrlStatus);

        if (getData.includes('Failure')) {
            alert('Transaction Declined!');
        } else if (getData.includes('Success')) {
            alert('Transaction Successful!');
        } else if (getData.includes('Aborted')) {
            alert('Transaction Cancelled!');
        } else {
            //alert('Status Not Known!');
        }
        //alert(getData);

    }

    const jsCode = `    
    var interval = setInterval(function(){
      var sourceCode = document.getElementsByTagName('body')[0].innerHTML.toString()
      
      //if(sourceCode.indexOf('shopping with us.')>-1){        
        window.ReactNativeWebView.postMessage(sourceCode)
        clearInterval(interval);
      //}
    },1000);`;

    console.log('WebView payload = ', payload);

    let web_url = Constants.TRANS_URL;

    console.log('WebView url = ', web_url);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView
                style={styles.WebViewStyle}
                automaticallyAdjustContentInsets={false}

                source={{
                    uri: web_url,
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: payload
                }}
                originWhitelist={['*']}
                injectedJavaScript={jsCode}
                onMessage={_onMessage}
                javaScriptEnabled
                domStorageEnabled
                renderLoading={ActivityIndicatorLoadingView}
                startInLoadingState
                onNavigationStateChange={onNavigationStateChange}
            />

        </SafeAreaView>
    )

}

export default WebViewScreen;