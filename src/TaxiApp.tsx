import { SafeAreaView, StyleSheet, Text } from "react-native"; // SafeAreaView : 안전한 구역에 표시를 하기 위해 사용, 다른 곳에 가려지지 않는 보장이 되는 위치를 찾음

function TaxiApp() : JSX.Element { // JSX.Element는 반환 타입
  console.log('-- TaxiApp()');

  return (
    <SafeAreaView>
      <Text style={styles.textBlack}>Hello React Native</Text>
      <Text style={styles.textBlue}>Taxi App</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textBlack: {
    fontSize: 18,
    color: 'black',
  },
  textBlue: {
    fontSize: 18,
    color: 'blue',
  },
});

export default TaxiApp;