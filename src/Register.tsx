import { SafeAreaView, StyleSheet, Text, TouchableOpacity, TextInput, View, Alert } from 'react-native'; // SafeAreaView : 안전한 구역에 표시를 하기 위해 사용, 다른 곳에 가려지지 않는 보장이 되는 위치를 찾음
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import API from './API';

function Register() : JSX.Element { // JSX.Element는 반환 타입
  console.log('-- Register()');

  const [UserId, setUserId] = useState('');
  const [UserPw, setUserPw] = useState('');
  const [UserPwConfirm, setUserPwConfirm] = useState('');

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const isDisable = () => {
    if (UserId && UserPw && UserPwConfirm && (UserPw == UserPwConfirm)) {
      return false;
    }
    else {
      return true;
    }
  };

  const onRegister = () => {
    API.register(UserId, UserPw)
    .then((response) => {
      let {code, message} = response.data[0];
      console.log('onRegister / code = ' + code + ', message = ' + message);

      if (code == 0) { // 회원가입 성공
        navigation.pop(); // 회원 가입 화면을 pop, 회원가입 화면이 사라짐 -> 로그인 화면으로 돌아감
        Alert.alert('성공', message, [{text: '확인', onPress: () => console.log('성공 확인 버튼 눌림'), style: 'cancel'}]);
      }
      else { // 회원가입 실패 (정상적으로 데이터는 보냈는데 서버에서 회원가입을 거절)
        // 밑에 Alert.alert는 정상적으로 회원가입이 안 됐을 때 뜰 창
        Alert.alert('오류', message, [{text: '확인', onPress: () => console.log('오류 확인 버튼 눌림'), style: 'cancel'}]);
      }
    })
    .catch((err) => { // 네트워크 자체 오류, 접속 자체가 안된 경우
      console.log('onRegister / err = ' + err);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, { justifyContent: 'flex-end' }]}>
        <Icon name="taxi" size={80} color={'#3498db'} />
      </View>

      {/* flex: 2를 하게 되면 flex: 1보다 2배의 자리를 차지하게 됨 */}
      <View style={[styles.container, { flex: 2 }]}>
        <TextInput style={styles.input} placeholder={'아이디'} onChangeText={(newId) => setUserId(newId)} />
        <TextInput style={styles.input} placeholder={'비밀번호'} secureTextEntry={true} onChangeText={(newPw) => setUserPw(newPw)} />
        <TextInput style={styles.input} placeholder={'비밀번호 확인'} secureTextEntry={true} onChangeText={(newPwConfirm) => setUserPwConfirm(newPwConfirm)} />
      </View>

      <View style={[styles.container, { justifyContent: 'flex-start' }]}>
        <TouchableOpacity style={isDisable() ? styles.buttonDisable : styles.button} disabled={isDisable()} onPress={onRegister}>
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

export default Register;