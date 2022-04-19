import axios from 'axios';
axios.defaults.withCredentials = true;

const token = sessionStorage.getItem('token');
const api = axios.create({
  baseURL: 'http://54.180.96.119',
});

export const apis = {
  //user

  login: (id, pw) => api.post('/user/login', { username: id, password: pw }),
  signup: (id, nickname, pw, pwcheck) => api.post('/api/register', {
    username: id,
    nickName: nickname,
    password: pw,
    passwordCheck: pwcheck
  }),

  idcheck: (email) => api.post('api/idCheck', { username: email }),

  nicknamecheck: (nickname) => api.post('api/nickName', { nickName: nickname }),

  islogin: () => api.get("/api/islogin", {
    headers: {
      "content-type": "applicaton/json;charset=UTF-8",
      "accept": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
    },
    // {
    //   // Authorization: `Bearer ${sessionStorage.getItem('token')}`
    // },
  }),
  // lgout: 

  //post
  Getallpost: () => api.get('/api/post'),
  addPost: (file) => api.post('/api/image', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
      "Authorization": `Bearer ${sessionStorage.getItem('token')}`
    }
  }),
  editPost: (postId, file) => api.put(`/api/image/${postId}`, file, {
    headers: {
      'Content-Type': 'multipart/form-data',
      "Authorization": `Bearer ${sessionStorage.getItem('token')}`
    }
  }), //이미지 보내는법 확인


  delPost: (postid) => api.delete(`api/post/${postid}`, {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('token')}`
    }
  }),
  GetComment: (postid) => api.get(`api/post/${postid}`),

  //comment
  addComment: (postId, contents) => api.post(`api/comment/${postId}`, { comment: contents }, {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('token')}`
    }
  }),
  delComment: (commentId) => api.delete(`api/comment/${commentId}`, {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('token')}`
    }
  }),
  getAllUser: () => api.get('/api/users', {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('token')}`
    }
  }),

  //
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
  inviteUser: (username) => api.post(`/api/chat/invite`, { username: username }, {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('token')}`
    }
  }),
  
  // 이전 메세지 가져오기
  getMessage: (roomId) => api.get(`/api/chat/rooms/${roomId}/message`, {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('token')}`
    }
  }),


}