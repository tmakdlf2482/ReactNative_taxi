// 서버에 접속을 하기 위한 셋팅
// 웹 서버와의 통신에서 필요한 공통적인 부분을 세팅
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://172.30.82.157:3000', // 주소
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
}