import { SafeAreaView, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native'; // SafeAreaView : 안전한 구역에 표시를 하기 위해 사용, 다른 곳에 가려지지 않는 보장이 되는 위치를 찾음
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, ParamListBase } from '@react-navigation/native'; // 다른 화면으로 넘어가기 위해 import
import { StackNavigationProp } from '@react-navigation/stack';

function Main_Setting() : JSX.Element { // JSX.Element는 반환 타입
  console.log('-- Main_Setting()');

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const onLogout = () => {
    AsyncStorage.removeItem('UserId')
    .then(() => {
      navigation.popToTop(); // popToTop은 가장 위에 제일 먼저 쌓였던 화면(Intro화면)으로 돌아감
    });
  };

  let arrSetMenu = [{id: 0, name: '로그아웃'}, {id: 1, name: '닉네임 설정'}, ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ width: '100%',  }}
        data={arrSetMenu}
        renderItem={({item}) => {
          console.log('row = ' + JSON.stringify(item));
          return (
            <>
              {
                item.id === 0 &&
                <TouchableOpacity style={styles.container} onPress={onLogout}>
                  <Text style={styles.textForm}>{item.name}</Text>
                </TouchableOpacity>
              }
              {
                item.id === 1 &&
                <TouchableOpacity style={styles.container} onPress={() => {navigation.navigate('NickName');}}>
                  <Text style={styles.textForm}>{item.name}</Text>
                </TouchableOpacity>
              }
            </>
          );
        }}
        keyExtractor={(item: any) => item.id}
      >
      </FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textForm: {
    borderWidth: 1,
    borderColor: '#3498db',
    padding: 20,
    width: '100%',
    fontSize: 18,
    textAlign: 'center',
    color: '#3498db',
    marginBottom: 2,
  },
});

export default Main_Setting;