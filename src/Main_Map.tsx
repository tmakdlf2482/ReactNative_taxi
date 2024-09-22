import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'; // SafeAreaView : 안전한 구역에 표시를 하기 위해 사용, 다른 곳에 가려지지 않는 보장이 되는 위치를 찾음
import Icon from 'react-native-vector-icons/FontAwesome';
// widthPercentageToDP, heightPercentageToDP는 화면에서의 퍼센트를 좌표로 바꿔주는 기능
// widthPercentageToDP : 가로 넓이에서 %로 좌표를 뽑아냄
// heightPercentageToDP : 세로 넓이에서 %로 좌표를 뽑아냄
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useState } from 'react';

function Main_Map() : JSX.Element { // JSX.Element는 반환 타입
  console.log('-- Main_Map()');

  const [ShowBtn, setShowBtn] = useState(false);

  // 꾹 누르는 버튼 클릭 함수 (async는 비동기 함수 -> 즉, 어떤 작업이 끝나지 않아도 이 함수를 실행)
  const handleLongPress = async (event: any) => {
    setShowBtn(true);
  };

  // 화면에 마커를 더해주고 버튼이 사라짐(내가 어느 위치를 찍으면 이 위치를 출발지로 지정하고 출발지 마커가 생기고 버튼이 사라짐)
  const handleAddMarker = (title: string) => {
    setShowBtn(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 지도가 들어갈 자리인데 일단 그림만 1개 띄워놓고 넘어감 */}
      <View style={[styles.container, { transform: [{scaleX: 1}, {scaleY: 2}] }]}>
        <Icon name="building" size={300} color={'#34db98'} onPress={() => {setShowBtn(false)}} onLongPress={handleLongPress} />
      </View>

      {/* position: 'absolute' : 두 UI 요소가 겹쳐질 때 사용하는 명령 */}
      <View style={{position: 'absolute', width: '100%', height: '100%', padding: 10}}>
        <View style={{flexDirection: 'row', }}>
          <View style={{flex: 1}}>
            <TextInput style={styles.input} placeholder={'출발지'} />
            <TextInput style={styles.input} placeholder={'도착지'} />
          </View>
          <TouchableOpacity style={[styles.button, { marginLeft: 10, justifyContent: 'center' }]}>
            <Text style={styles.buttonText}>호출</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 이 버튼을 누르면 내 위치를 보여줌 */}
      <TouchableOpacity style={{position: 'absolute', bottom: 20, right: 20}}>
        <Icon name="crosshairs" size={40} color={'#3498db'} />
      </TouchableOpacity>

      {/* 지도 위를 꾹 눌러 위치를 지정한 다음 그 위치를 출발지 또는 도착지로 등록 */}
      {
        ShowBtn &&
        <View style={{ position: 'absolute', top: hp(50)-45, left: wp(50)-75, width: 150, height: 90 }}>
          <TouchableOpacity style={[styles.button, { flex: 1, marginVertical: 1, }]} onPress={() => {handleAddMarker('출발지')}}>
            <Text style={styles.buttonText}>출발지로 등록</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { flex: 1, }]} onPress={() => {handleAddMarker('도착지')}}>
            <Text style={styles.buttonText}>도착지로 등록</Text>
          </TouchableOpacity>
        </View>
      }
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
  input: {
    height: 40,
    borderWidth: 2,
    borderColor: 'gray',
    marginVertical: 1,
    padding: 10,
  },
});

export default Main_Map;