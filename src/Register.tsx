import { SafeAreaView, StyleSheet, Text, TouchableOpacity, TextInput, View } from "react-native"; // SafeAreaView : 안전한 구역에 표시를 하기 위해 사용, 다른 곳에 가려지지 않는 보장이 되는 위치를 찾음
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from 'react';

function Register() : JSX.Element { // JSX.Element는 반환 타입
  console.log('-- Register()');

  const [UserId, setUserId] = useState('');
  const [UserPw, setUserPw] = useState('');
  const [UserPwConfirm, setUserPwConfirm] = useState('');

  const isDisable = () => {
    if (UserId && UserPw && UserPwConfirm && (UserPw == UserPwConfirm)) {
      return false;
    }
    else {
      return true;
    }
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
        <TouchableOpacity style={isDisable() ? styles.buttonDisable : styles.button} disabled={isDisable()}>
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