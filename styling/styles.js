import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 50,
    marginBottom: 50,
    padding: 30,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#0f87fe',
    margin: 10,
    padding: 10,
  },
  titleText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  mainApp: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutUs: {
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 100,
    padding: 30,
  },
  table: {
    flex: 1,
    marginTop: 100,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  row: {
    flex: 1,
    alignSelf: 'stretch',
  },
});


const funcs = { styles };
export default funcs;
