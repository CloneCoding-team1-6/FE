import axios from 'axios';
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: 'http://121.139.34.35:8080',
});

export const apis = {
  // 로그인
  login: (id, pw) => api.post('/user/login', { username: id, password: pw }),
  // 회원가입
  signup: (user_data) => api.post('/api/register', { ...user_data }),
  // 아이디 중복체크
  idcheck: (email) => api.post('api/idCheck', { username: email }),
  // 닉네임 중복체크
  nicknamecheck: (nickname) => api.post('api/nickName', { nickName: nickname }),
  // 로그인 체크
  islogin: () => api.get('/api/isLogin', {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
    },
  }),
  // 모든 유저정보 가져오기
  getAllUser: () => api.get('/api/users', {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('token')}`
    }
  }),
  // 프로필 이미지 수정하기
  editimage: (file) => api.put('api/userImage', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
      "Authorization": `Bearer ${sessionStorage.getItem('token')}`
    }
  }),
}

export const ChatAPI = {
  // 방 목록 가져오기
  getChatRoom: () => api.get('/api/chat/rooms', {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('token')}`
    }
  }),
  // 방 추가하기
  addChatRoom: (room) => api.post('/api/chat/rooms', room, {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
    }
  }),
  // 방 접속하기
  enterRoom: (roomId) => api.get(`/api/chat/rooms/${roomId}`, {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('token')}`
    }
  }),
  // 유저 초대하기
  inviteUser: (roomid, username) => api.post(`/api/chat/invite`, { username: username, roomId: roomid }, {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('token')}`
    }
  }),
  // 이전 메세지 가져오기
  getMessage: (roomId) => api.get(`/api/chat/rooms/${roomId}/messages`, {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('token')}`
    }
  }),
  // 방 퇴장하기
  leaveRoom: (roomId) => api.delete(`api/chat/rooms/${roomId}`, {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('token')}`
    }
  }),
}