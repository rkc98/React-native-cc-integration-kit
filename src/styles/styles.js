import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
    marginTop: (Platform.OS) === 'ios' ? 20 : 0,
  },
  title: {
    fontSize: 36,
    marginBottom: 16,
    textAlign: 'center',
  },
  androidButtonText: {
    position: 'absolute',
    alignSelf: "center",
    color: "#FFFFFF",
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "100",
    backgroundColor: '#5dade2',
  },
  textInputStyle: {

    height: 40,
    width: '90%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#0000FF',
    borderRadius: 8,
    marginTop: 15
  },
  button_old: {
    alignItems: "center",
    backgroundColor: '#5dade2',
    padding: 10,
    width: '50%',
    height: 50,
    borderRadius: 8,

  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: '#5dade2',
    padding: 10,
    height: 40,
    width: '60%',
    textAlign: 'center',
    borderRadius: 8,
    marginVertical: 10,

  },

  cardLayout: {
    alignItems: 'center',
    marginTop: 50,
    width: '50%',
    height: 50,

  },
  cardPayButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50%',
    backgroundColor: '#E85B3A',
    marginLeft: '12%',
    padding: 10,
    width: '75%',
    height: 50,
    borderRadius: 25,

  },
  WebViewStyle:
  {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: (Platform.OS) === 'ios' ? 20 : 0
  },
  ActivityIndicatorStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',

  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    backgroundColor: "#E0E0E0",
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 5,
  },
  Scroll: {
    // flex: 1,
    flexGrow: 1
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: width / 1.3,
    padding: 10,
  },
  cardView: {
    marginHorizontal: "auto",
    maxWidth: 500,
    margin: 5
},

titleContainer: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginLeft: 10,
  margin: 5,
  height: 50,
  backgroundColor: '#f5f4f9',
  //
  alignItems: 'center',
  borderWidth: .1,
  borderColor: '#000',
},
title: {
  flex: 1,
  fontSize: 16,
  fontWeight: 'bold',
  marginLeft: 2,
  padding: 5,
},
image: {
  width: 25,
  height: 25,
  marginVertical: 10,
  // borderRadius: 5,
  margin: 5
},
containerHeader: {

  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: 150,
},

viewHeader: {
  backgroundColor: '#151c2f',
},

applyText: {
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 'normal',
  justifyContent: 'center',
  color: 'white',

},

text: {
  textAlign: 'center',
  fontSize: 20,
  fontWeight: '100',
  color: 'white',
  marginTop: 5,

},
samsungPayText: {
  textAlign: 'center',
  fontSize: 16,
  fontWeight: '100',
  color: '#646D7E',
  marginTop: 10,

},
SectionStyle: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderWidth: .5,
  borderColor: '#000',
  height: 40,
  borderRadius: 5,
  marginStart: 20,
  marginEnd: 20,
  margin: 10,
},

//
cardPayButton: {
  alignSelf: 'center',
  marginTop: 10,
  backgroundColor: '#E85B3A',
  padding: 10,
  height: 40,
  width: '98%',
  borderRadius: 1,
  marginLeft: 6,


},
payContainer: {
  flex: 1,
  justifyContent: 'center',
  borderColor: "#C0C3CA",
  borderLeftWidth: 1,
  borderRightWidth: 1,
  borderBottomWidth: 1,
  margin: 5,
},

payButton: {
  alignSelf: 'center',
  backgroundColor: '#E85B3A',
  height: 40,
  width: '90%',
  padding: 10,
  borderRadius: 5,
  margin: 20,
  paddingHorizontal: 10,


},

});
