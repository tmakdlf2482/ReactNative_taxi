import { StyleSheet } from 'react-native'; // SafeAreaView : 안전한 구역에 표시를 하기 위해 사용, 다른 곳에 가려지지 않는 보장이 되는 위치를 찾음
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Main_Map from './Main_Map';
import Main_List from './Main_List';
import Main_Setting from './Main_Setting';

function Main() : JSX.Element { // JSX.Element는 반환 타입
  console.log('-- Main()');

  const BottomTab = createBottomTabNavigator();

  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="지도" component={Main_Map}
      options={{ headerShown: false,
        tabBarIcon: ({color, size}) => (<Icon name='map' size={size} color={color} />)
      }} />
      <BottomTab.Screen name="콜 목록" component={Main_List}
      options={{ headerShown: false,
        tabBarIcon: ({color, size}) => (<Icon name='phone' size={size} color={color} />)
      }} />
      <BottomTab.Screen name="Main_Setting" component={Main_Setting}
      options={{ headerShown: true, title: '환경설정',
        tabBarIcon: ({color, size}) => (<Icon name='cog' size={size} color={color} />)
      }} />
    </BottomTab.Navigator>
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

export default Main;