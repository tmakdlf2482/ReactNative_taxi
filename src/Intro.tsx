// TouchableOpacity 는 버튼과 유사
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native"; // SafeAreaView : 안전한 구역에 표시를 하기 위해 사용, 다른 곳에 가려지지 않는 보장이 되는 위치를 찾음
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

function Intro() : JSX.Element { // JSX.Element는 반환 타입
  console.log('-- Intro()');

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  // 버튼을 누르면 Login Component로 넘어감
  const gotoLogin = () => {
    // .push : Stack에서 새로운 화면을 추가시키는 것, 네비게이션에게 새로운 화면이 들어간다고 알려주면 그 위에 새로운 화면이 덮히게됨
    navigation.push('Login'); // Login 화면으로 덮힘
  };

  return (
    <SafeAreaView>
      <Text style={styles.textBlack}>Hello React Native</Text>
      <Text style={styles.textBlue}>Intro</Text>

      <TouchableOpacity style={styles.button} onPress={gotoLogin}>
        <Text style={styles.buttonText}>로그인으로 이동</Text>
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

export default Intro;