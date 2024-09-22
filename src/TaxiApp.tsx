import { StyleSheet } from 'react-native'; // SafeAreaView : 안전한 구역에 표시를 하기 위해 사용, 다른 곳에 가려지지 않는 보장이 되는 위치를 찾음
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Intro from './Intro';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Main_Setting_NickName from './Main_Setting_NickName';

function TaxiApp() : JSX.Element { // JSX.Element는 반환 타입
  console.log('-- TaxiApp()');

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* headerShown 은 header(제목)를 보여줄 것이냐 말것이냐 */}
        <Stack.Screen name='Intro' component={Intro} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Register' component={Register} options={{ headerShown: true, title: '회원가입' }} />
        <Stack.Screen name='Main' component={Main} options={{ headerShown: false }} />
        <Stack.Screen name='NickName' component={Main_Setting_NickName} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
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