import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native"; // SafeAreaView : 안전한 구역에 표시를 하기 위해 사용, 다른 곳에 가려지지 않는 보장이 되는 위치를 찾음
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

function Login() : JSX.Element { // JSX.Element는 반환 타입
  console.log('-- Login()');

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const gotoRegister = () => {
    navigation.push('Register'); // 이 'Register'는 화면의 이름으로 넘기기 때문에 TaxiApp.tsx에서 Stack.Screen name='' 으로 지정된 이름이 중요함
  };

  const gotoMain = () => {
    navigation.push('Main');
  };

  return (
    <SafeAreaView>
      <Text style={styles.textBlack}>Hello React Native</Text>
      <Text style={styles.textBlue}>Login</Text>

      <TouchableOpacity style={styles.button} onPress={gotoRegister}>
        <Text style={styles.buttonText}>회원 가입으로 이동</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { marginTop: 5 }]} onPress={gotoMain}>
        <Text style={styles.buttonText}>메인으로 이동</Text>
      </TouchableOpacity>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Login;