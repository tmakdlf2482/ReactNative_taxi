// 서버에 접속을 하기 위한 셋팅
// 웹 서버와의 통신에서 필요한 공통적인 부분을 세팅
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.200.181:3000', // 현재 내 컴퓨터가 작업하고 있는 아이피 주소
  timeout: 10000, // 10초
});

export default {
  test() { // 테스트
    return instance.get('/taxi/test');
  },
  login(id: string, pw: string) { // 로그인 (유저)
    return instance.post('/taxi/login', {userId: id, userPw: pw});
  },
  register(id: string, pw: string) { // 회원가입 (유저)
    return instance.post('/taxi/register', {userId: id, userPw: pw});
  },
  list(id: string) { // 콜 목록 불러오기 (유저)
    return instance.post('/taxi/list', {userId: id});
  },
  geoCoding(coords: any, key: string) { // Geocoding API를 구글을 이용해 사용하는 함수
    let url = 'https://maps.googleapis.com/maps/api/geocode/json'; // 구글 쪽 서버의 주소
    let lat = coords.latitude; // 위도
    let lng = coords.longitude; // 경도

    return axios.get(`${url}?latlng=${lat},${lng}&key=${key}&language=ko`);
  },
}