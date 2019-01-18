import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 50,
    marginBottom: 50,
    padding: 30,
  },
  pieChart: {
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 20,
    padding: 30,
    alignItems: 'center',
  },
  pieChartText: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#0f87fe',
    margin: 10,
    padding: 10,
  },
  titleText: {
    marginTop: 20,
    // textAlign: 'center',
    paddingLeft: 20,
    fontSize: 16,
  },
  closingCosts: {
    marginTop: 70,
    paddingLeft: 20,
    fontSize: 14,
  },
  SellerClosingCosts: {
    marginTop: 130,
    paddingLeft: 20,
    fontSize: 14,
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
  output: {
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 50,
    padding: 30,
  },
});


const funcs = { styles };
export default funcs;
