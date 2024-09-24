// RefreshControl : 서버에서 목록을 가져오게 되면 새로고침 해야함, 당겨서 새로고침 기능
import { SafeAreaView, StyleSheet, Text, View, FlatList, RefreshControl, Modal, Alert } from 'react-native'; // SafeAreaView : 안전한 구역에 표시를 하기 위해 사용, 다른 곳에 가려지지 않는 보장이 되는 위치를 찾음
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native'; // 화면에 들어오자마자 리스트를 뿌려줌 (react에서의 useEffect와 비슷함)
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';// '로딩중' 아이콘
import AsyncStorage from '@react-native-async-storage/async-storage'; // 서버에다가 호출 목록을 부르려고 할 때는 유저 아이디를 알고 있어야 함, 내부 저장 장소에서 유저 아이디를 가져오기 위함
import API from './API';

// 콜 목록 리스트 : 내가 어떤 위치를 찍고 서버에다가 호출을 요청하면 내가 호출을 요청했던 리스트들이 나옴
function Main_List() : JSX.Element { // JSX.Element는 반환 타입
  console.log('-- Main_List()');

  const [CallList, setCallList] = useState([]);
  const [Loading, setLoading] = useState(false); // 로딩을 띄우기 위해서 로딩 창이 지금 뜰 상황인지 아닌지 저장하는 변수

  useFocusEffect(React.useCallback(() => { // useFocusEffect : 이 앱이 실행됐을 때 실행시킴 (react에서 useEffect와 비슷함)
    requestCallList();
  }, []));

  // CallList를 요청하는 함수
  const requestCallList = async () => {
    setLoading(true); // 데이터를 서버에서 불러올 때 Loading창 띄우기

    let userId = await AsyncStorage.getItem('UserId') || '';

    API.list(userId)
    .then((response) => {
      console.log('requestCallList / response.data = ' + JSON.stringify(response.data[0]));

      let {code, message, data} = response.data[0];
      console.log('requestCallList / code = ' + code + ', message = ' + message + ', data = ' + data);

      if (code == 0) { // 콜 목록을 정상적으로 가져온 경우
        setCallList(data);
      }
      else { // 콜 목록을 잘못 가져온 경우
        Alert.alert('오류', message, [{text: '확인', onPress: () => console.log('오류 확인 버튼 눌림'), style: 'cancel'}]);
      }

      setLoading(false);
    })
    .catch((err) => { // 네트워크 자체 오류, 접속 자체가 안된 경우
      console.log('requestCallList / err = ' + err);
      
      setLoading(false);
    });
  };

  const header = () => {
    return (
      <View style={styles.header}>
        <Text style={[styles.headerText, { width: wp(80) }]}>출발지 / 도착지</Text>
        <Text style={[styles.headerText, { width: wp(20) }]}>상태</Text>
      </View>
    );
  };

  // 데이터를 받아 표시
  const ListItem = (row: any) => {
    console.log('row = ' + JSON.stringify(row)); // array/object -> string

    return (
      <View style={{ flexDirection: 'row', marginBottom: 5, width: wp(100) }}>
        <View style={{ width: wp(80) }}>
          <Text style={styles.textForm}>{row.item.start_addr}</Text>
          <Text style={[styles.textForm, { borderTopWidth: 0 }]}>{row.item.end_addr}</Text>
        </View>

        <View style={{ width: wp(20), alignItems: 'center', justifyContent: 'center' }}>
          <Text>{row.item.call_state}</Text>
        </View>
      </View>
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={CallList}
        ListHeaderComponent={header}
        renderItem={ListItem}
        keyExtractor={(item: any) => item.id}
        refreshControl={ // 당겨서 새로고침
          // refreshing은 refresh인지 아닌지, onRefresh는 refresh 이벤트가 발생하면 requestCallList 호출
          <RefreshControl refreshing={Loading} onRefresh={requestCallList} />
        }
      ></FlatList>

      {/* visible={Loading}은 로딩 중에만 보임, Loading이 true이면 모달창이 보임 */}
      <Modal transparent={true} visible={Loading}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <Icon name='spinner' size={50} color={'#3498db'} />
          <Text style={{ color: 'black', }}>로딩중...</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    height: 50,
    marginBottom: 5,
    backgroundColor: '#3498db',
    color: 'white',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  textForm: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#3498db',
    height: hp(5),
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Main_List;