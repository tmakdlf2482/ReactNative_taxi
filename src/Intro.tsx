// TouchableOpacity 는 버튼과 유사
import { SafeAreaView, StyleSheet } from "react-native"; // SafeAreaView : 안전한 구역에 표시를 하기 위해 사용, 다른 곳에 가려지지 않는 보장이 되는 위치를 찾음
import { useNavigation, ParamListBase, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';

// useFocusEffect : 해당 화면으로 포커스가 왔을 때 발생하는 이벤트를 끌고 옴
// hooking : 이벤트를 끌고 오는 것
function Intro() : JSX.Element { // JSX.Element는 반환 타입
  console.log('-- Intro()');

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  useFocusEffect(React.useCallback(() => { // useFocusEffect : 이 앱이 실행됐을 때 실행시킴 (react에서 useEffect와 비슷함)
    setTimeout( () => {
      let isAutoLogin = false; // isAutoLogin : 자동 로그인 기능을 구현해서 isAutoLogin이 true이면 메인 화면으로 바로 넘어가고, false면 로그인 화면으로 넘어감
      
      if (isAutoLogin) { // isAutoLogin이 true이면 Main 컴포넌트로 이동
        navigation.push('Main');
      }
      else { // isAutoLogin이 false이면 Login 컴포넌트로 이동
        navigation.push('Login');
      }
    }, 2000);
  }, []));

  return (
    <SafeAreaView style={styles.container}>
      <Icon name='taxi' size={100} color={'#3498db'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Intro;