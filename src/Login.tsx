import { SafeAreaView, StyleSheet, TouchableOpacity, View, TextInput, Text } from 'react-native'; // SafeAreaView : 안전한 구역에 표시를 하기 위해 사용, 다른 곳에 가려지지 않는 보장이 되는 위치를 찾음
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login() : JSX.Element { // JSX.Element는 반환 타입
  console.log('-- Login()');

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [UserId, setUserId] = useState('');
  const [UserPw, setUserPw] = useState('');
  const [Disable, setDisable] = useState(true); // 로그인 버튼 활성화/비활성화

  const onIdChange = (newId: string) => {
    // 먼저 사용자가 입력한 Id가 채워져있고, 그 다음에 비밀번호가 채워져 있다면 로그인 버튼 활성화, 사용자가 입력한 Id가 채워져 있지 않으면 뒤에 있는 비밀번호가 채워져 있는지 체크하지 않음
    newId && UserPw ? setDisable(false) : setDisable(true);
    setUserId(newId);
  };

  const onPwChange = (newPw: string) => {
    // 먼저 사용자가 입력한 비밀번호가 채워져 있고, 그 다음에 아이디가 채워져 있다면 로그인 버튼 활성화, 사용자가 입력한 비밀번호가 채워져 있지 않으면 뒤에 있는 아이디가 채워져 있는지 체크하지 않음
    newPw && UserId ? setDisable(false) : setDisable(true);
    setUserPw(newPw);
  };

  const gotoRegister = () => {
    navigation.push('Register'); // 이 'Register'는 화면의 이름으로 넘기기 때문에 TaxiApp.tsx에서 Stack.Screen name='' 으로 지정된 이름이 중요함
  };

  const gotoMain = () => {
    // 1번 로그인 하면 로그인 한 유저 아이디를 저장 
    AsyncStorage.setItem('UserId', UserId)
    .then(() => {
      navigation.push('Main');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Icon name='taxi' size={80} color={'#3498db'} />
      </View>

      <View style={styles.container}>
        <TextInput style={styles.input} placeholder={"아이디"} onChangeText={onIdChange} />
        {/* secureTextEntry는 인풋 창이 별표로 표시됨 */}
        <TextInput style={styles.input} placeholder={"패스워드"} secureTextEntry={true} onChangeText={onPwChange} />
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={Disable? styles.buttonDisable : styles.button} disabled={Disable} onPress={gotoMain}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {marginTop: 5}]} onPress={gotoRegister}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: '70%',
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonDisable: {
    width: '70%',
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    width: '70%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    padding: 10,
  },
});

export default Login;