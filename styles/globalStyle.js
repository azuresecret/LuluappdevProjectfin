import { Dimensions, StyleSheet } from 'react-native';

const win = Dimensions.get('window');
const globalStyle = StyleSheet.create({
  appButtonText: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    backgroundColor: '#009688',
    flex: 1,
    padding: 20,
    margin: 10,
    borderRadius: '50%',
  },
  CartIcon: {
    maxHeight: '300px',
    maxWidth: '300px',
    height: '25%',
    width: '48%',
    marginHorizontal: 'auto',
  },
  CartContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  googleButton: {
    height: 36,
    flexDirection: 'row',
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    marginHorizontal: 20,
    marginTop: 10,
  },
  homeStyles: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    //  justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  homeTitle: {
    fontSize: 30,
    fontWeight: 500,
    color: 'cyan',
    opacity: 1,
  },

  homeImage: {
    height: '100%',
    width: '100%',
  },
  cartItem: {
    width: '100%',
    // textAlign: 'center',
    // justifyContent: 'space-between'
  },
  priceText: {
    float: 'right',
  },
  itemDetailText: {
    // flex: 1,
    fontSize: 15,
    padding: 20,
    float: 'left',
  },
  cartItemText: {
    fontSize: 20,
    padding: 20,
    width: '95%',
  },
  itemDetailTitle: {
    fontSize: 25,
    fontWeight: 500,
    padding: 40,
  },
  item: {
    padding: 5,
    // marginVertical: 8,
    // marginHorizontal: 16,
    flex: 1,
    width: '45%',
    height: '100%',
  },
  detailButtonStyle: {
    marginHorizontal: 'auto',
    marginTop: 20,
    // width: '45%',
    // margin: 'auto',
    height: '10%',
    width: '50%',
  },
  ItemDetailContainer: {
    marginHorizontal: 'auto',
    textAlign: 'center',
    height: '100%',
    width: '100%',
  },
  HomeImageContainer: {
    height: '60%',
    width: '100%',
  },
  detailedImage: {
    maxHeight: '400px',
    maxWidth: '400px',
    height: '50%',
    width: '80%',
    marginHorizontal: 'auto',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  menuContainer: {
    display: 'flex',
    flex: 1,
    marginHorizontal: 20,
    marginTop: 10,
  },
  menuLogo: {
    height: win.width / 2 - 50,

    maxHeight: '300px',
    maxWidth: '300px',
    width: '100%',
  },
  roundButton1: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  nameButton: {
    backgroundColor: 'green',
  },
  tabViewContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    fontSize: 32,
  },

  swipedRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingLeft: 5,
    backgroundColor: '#818181',
    margin: 20,
    minHeight: 50,
  },
  swipedConfirmationContainer: {
    flex: 1,
  },
  deleteConfirmationText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#b60000',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  deleteButtonText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
    padding: 3,
  },
});

export default globalStyle;
