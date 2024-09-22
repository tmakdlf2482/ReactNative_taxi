import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Main_Setting_NickName() {
  const [NickName, setNickName] = useState('');
  const [InputNickName, setInputNickName] = useState('');

  // 닉네임 불러오기
  // 재렌더링 할때마다 코드 실행
  useEffect(() => {
    const loadNickName = async () => {
      try {
        const storedNickName = await AsyncStorage.getItem('nickname');

        if (storedNickName !== null) {
          setNickName(storedNickName);
        }
      }
      catch (error) {
        console.error('닉네임 로드에 실패하였습니다.', error);
      }
    };

    loadNickName();
  });

  // 닉네임 저장
  const saveNickName = async () => {
    if (InputNickName === '') {
      Alert.alert('오류', '닉네임을 입력하지 않았어요. 닉네임을 입력해주세요.')
      return;
    }

    try {
      await AsyncStorage.setItem('nickname', InputNickName);
      setNickName(InputNickName);
      Alert.alert('성공', '닉네임이 저장되었습니다.')
    }
    catch (error) {
      console.error('닉네임 저장에 실패하였습니다.', error);
      Alert.alert('오류', '닉네임 저장에 실패하였습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>{NickName ? `현재 닉네임 : ${NickName}` : '닉네임이 설정되지 않았습니다. 닉네임을 설정해주세요.'}</Text>
        <TextInput style={styles.input} placeholder='닉네임 입력' value={InputNickName} onChangeText={setInputNickName} />
        <TouchableOpacity style={styles.button} onPress={saveNickName}>
          <Text style={styles.buttonText}>저장</Text>
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
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonDisable: {
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
  text: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 2,
    borderColor: 'gray',
    marginVertical: 1,
    padding: 10,
  },
});

export default Main_Setting_NickName;