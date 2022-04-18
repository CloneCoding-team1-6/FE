import axios from 'axios';
axios.defaults.withCredentials = true;

const token = localStorage.getItem('token');
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
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    },
    // {
    //   // Authorization: `Bearer ${localStorage.getItem('token')}`
    // },
  }),
  // lgout: 

  //post
  Getallpost: () => api.get('/api/post'),
  addPost: (file) => api.post('/api/image', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  }),
  editPost: (postId, file) => api.put(`/api/image/${postId}`, file, {
    headers: {
      'Content-Type': 'multipart/form-data',
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  }), //이미지 보내는법 확인


  delPost: (postid) => api.delete(`api/post/${postid}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  }),
  GetComment: (postid) => api.get(`api/post/${postid}`),

  //comment
  addComment: (postId, contents) => api.post(`api/comment/${postId}`, { comment: contents }, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  }),
  delComment: (commentId) => api.delete(`api/comment/${commentId}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  }),

  //
}