import { SafeAreaView, StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'; // SafeAreaView : 안전한 구역에 표시를 하기 위해 사용, 다른 곳에 가려지지 않는 보장이 되는 위치를 찾음
import Icon from 'react-native-vector-icons/FontAwesome';
// widthPercentageToDP, heightPercentageToDP는 화면에서의 퍼센트를 좌표로 바꿔주는 기능
// widthPercentageToDP : 가로 넓이에서 %로 좌표를 뽑아냄
// heightPercentageToDP : 세로 넓이에서 %로 좌표를 뽑아냄
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useState, useRef } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps'; // 지도 위에 Marker 점 찍기, Polyline 선 그리기
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import API from './API';
import Geolocation from '@react-native-community/geolocation';
import config from '../key';
const { GOOGLE_MAPS_KEY } = config;

function Main_Map() : JSX.Element { // JSX.Element는 반환 타입
  console.log('-- Main_Map()');

  const [Loading, setLoading] = useState(false); // 로딩 아이콘이 표시가 되는지 안되는지 체크하는 변수
  const [SelectedLatLng, setSelectedLatLng] = useState({latitude: 0, longitude: 0}); // 위치를 찍으면 화면을 다시 그림, 위치 정보 감시
  const [SelectedAddress, setSelectedAddress] = useState(''); // 위치를 찍으면 화면을 다시 그림, 주소 정보 감시
  const [ShowBtn, setShowBtn] = useState(false);
  const [InitialRegion, setInitialRegion] = useState({ // 지도를 켰을 때 초기에 어느 위치, 어느 사이즈(화면 사이즈 말고 지도의 사이즈)로 띄울 것인지
    latitude: 37.5666612,
    longitude: 126.9783785,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // 장소를 입력했을 때 그 장소를 가지고 구글의 쿼리를 날림
  let query = {
    key: GOOGLE_MAPS_KEY,
    language: 'ko', // 한국어
    components: 'country:kr', // 한국을 대상으로 검색
  }

  // 마커를 사용하기 위한 변수
  const [Marker1, setMarker1] = useState({latitude: 0, longitude: 0}); // 출발점
  const [Marker2, setMarker2] = useState({latitude: 0, longitude: 0}); // 도착점

  // 마커 점 찍기, 선 긋기
  const onSelectAddr = (data: any, details: any, type: string) => {
    if (details) {
      let lat = details.geometry.location.lat;
      let lng = details.geometry.location.lng;

      // 검색 타입이 start냐 end냐에 따라 마커를 찍는 동작을 달리 함
      if (type == 'start') { // 검색 타입이 출발지이면
        setMarker1({latitude: lat, longitude: lng});
        
        // 첫번째 마커를 옮긴 다음에 두 번째 마커가 셋팅되어 있는지 체크
        if (Marker2.longitude == 0) { // 도착지가 셋팅이 안된 경우
          setInitialRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.0073,
            longitudeDelta: 0.0064,
          });
        }
      }
      else { // 검색 타입이 도착지이면
        setMarker2({latitude: lat, longitude: lng});

        if (Marker1.longitude == 0) { // 출발지가 셋팅이 안된 경우
          setInitialRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.0073,
            longitudeDelta: 0.0064,
          });
        }
      }
    }
  };

  const mapRef : any = useRef(null);

  if (Marker1.latitude != 0 && Marker2.latitude != 0) { // Marker1과 Marker2가 모두 셋팅이 된 상태
    if (mapRef.current) { // mapRef가 지금 지정이 되어 있다면
      // mapRef를 참조해서 웹 뷰의 위치를 옮김
      mapRef.current.fitToCoordinates([Marker1, Marker2], {
        edgePadding: {top: 120, right: 50, bottom: 50, left: 50},
        animated: true, // 위치가 조정될때 스윽 부드럽게 움직임
      });
    }
  }

  // 꾹 누르면 출발점이나 도착점으로 선택하는 함수 (async는 비동기 함수 -> 즉, 어떤 작업이 끝나지 않아도 이 함수를 실행)
  const handleLongPress = async (event: any) => {
    const { coordinate } = event.nativeEvent;

    setSelectedLatLng(coordinate);

    setLoading(true);

    API.geoCoding(coordinate, query.key)
    .then((response) => {
      setSelectedAddress(response.data.results[0].formatted_address);

      setShowBtn(true); // 출발지와 도착지 선택 버튼

      setLoading(false);
    })
    .catch((err) => {
      console.log('handleLongPress / err = ' + err);

      setLoading(false);
    });
  };

  // handle marker
  const autoComplete1 : any = useRef(null); // 출발지
  const autoComplete2 : any = useRef(null); // 도착지

  // 출발지 또는 도착지 버튼이 눌렸을 때의 처리
  // 어떤 장소를 선택한 다음 출발지 버튼을 누르면 그 장소가 출발지가 됨
  const handleAddMarker = (title: string) => {
    if (SelectedAddress) {
      if (title == '출발지') {
        setMarker1(SelectedLatLng);

        if (autoComplete1.current) {
          autoComplete1.current.setAddressText(SelectedAddress); // 위치를 찍어서 주소 정보를 가져와 GooglePlacesAutocomplete에다가 해당 찍은 주소 텍스트를 넣음
        }
      }
      else { // 도착지
        setMarker2(SelectedLatLng);

        if (autoComplete2.current) {
          autoComplete2.current.setAddressText(SelectedAddress); // 위치를 찍어서 주소 정보를 가져와 GooglePlacesAutocomplete에다가 해당 찍은 주소 텍스트를 넣음
        }
      }

      // 출발지, 도착지 버튼 닫아줌
      setShowBtn(false);
    }
  };

  // 현재의 내 위치를 가지고 오는 함수
  const setMyLocation = () => {
    setLoading(true);

    Geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords; // 좌표 가져옴
        let coords = { latitude, longitude };

        setMarker1(coords); // 출발지
        
        setInitialRegion({latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0}) // 지도 위치 초기화

        setInitialRegion({latitude: latitude, longitude: longitude, latitudeDelta: 0.0073, longitudeDelta: 0.0064});

        API.geoCoding(coords, query.key)
        .then((response) => {
          let addr = response.data.results[0].formatted_address; // 좌표 -> 주소, 주소창에 넣기

          autoComplete1.current.setAddressText(addr); // 출발지 주소 이름으로 셋팅

          setLoading(false);
        })
        .catch((err) => {
          console.log('setMyLocation / err = ' + err);

          setLoading(false);
        });
      },
      (error) => {
        setLoading(false);
        console.log('Geolocation / error = ' + error);
      },
      {
        enableHighAccuracy: false, // 정확한 위치 정보를 못 가져올 경우에도 처리가 가능해짐
        timeout: 10000, // 10초
        maximumAge: 1000, // 1초, 위치 정보를 어느 정도 길이까지 캐시를 재활용하느냐
      }
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 지도가 들어갈 자리 */}
      <MapView style={styles.container} provider={PROVIDER_GOOGLE} region={InitialRegion} ref={mapRef} onLongPress={handleLongPress} onPress={() => {setShowBtn(false)}}>
        <Marker coordinate={Marker1} title='출발 위치' />
        <Marker coordinate={Marker2} title='도착 위치' pinColor='blue' />

        {
          Marker1.latitude != 0
          &&
          Marker2.latitude != 0
          &&
          (
            <Polyline coordinates={[Marker1, Marker2]} strokeColor='blue' strokeWidth={3} />
          )
        }
      </MapView>

      {/* position: 'absolute' : 두 UI 요소가 겹쳐질 때 사용하는 명령 */}
      <View style={{position: 'absolute', width: '100%', height: '100%', padding: 10}}>
        <View style={{ position: 'absolute', padding: wp(2) }}>
          <View style={{ width: wp(75) }}>
            <GooglePlacesAutocomplete
              ref={autoComplete1}
              onPress={(data, details) => onSelectAddr(data, details, 'start')}
              minLength={2}
              placeholder='출발지 검색'
              query={query}
              keyboardShouldPersistTaps={'handled'}
              fetchDetails={true}
              enablePoweredByContainer={false}
              onFail={(error) => console.log(error)}
              onNotFound={() => console.log('결과가 없습니다.')}
              styles={{autoCompleteStyles}} />
          </View>

          <View style={{ width: wp(75) }}>
            <GooglePlacesAutocomplete
              ref={autoComplete2}
              onPress={(data, details) => onSelectAddr(data, details, 'end')}
              minLength={2}
              placeholder='도착지 검색'
              query={query}
              keyboardShouldPersistTaps={'handled'}
              fetchDetails={true}
              enablePoweredByContainer={false}
              onFail={(error) => console.log(error)}
              onNotFound={() => console.log('결과가 없습니다.')}
              styles={{autoCompleteStyles}} />
          </View>
        </View>
        
        <TouchableOpacity style={[styles.button, { position: 'absolute', width: wp(18), height: 90, top: wp(2), right: wp(2), justifyContent: 'center' }]}>
          <Text style={styles.buttonText}>호출</Text>
        </TouchableOpacity>
      </View>

      {/* 이 버튼을 누르면 내 위치를 보여줌 */}
      <TouchableOpacity style={{position: 'absolute', bottom: 20, right: 20}} onPress={setMyLocation}>
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

      <Modal transparent={true} visible={Loading}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name='spinner' size={50} color='blue' />
          <Text style={{ backgroundColor: 'white', color: 'black', height: 20 }}>Loading...</Text>
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

const autoCompleteStyles = StyleSheet.create({
  textInputContainer: {
    width: '100%',
    height: 40,
    backgroundColor: '#e9e9e9',
    borderRadius: 8,
  },
  textInput: {
    height: 40,
    color: '#5d5d5d',
    fontSize: 16,
  },
  preDefinedPlacesDescription: {
    color: '#1faadb',
    zIndex: 1,
  },
});

export default Main_Map;