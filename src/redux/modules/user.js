import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { setCookie, deleteCookie } from "../../shared/Cookie";
// import { auth } from '../../shared/firebase';
// 서버와 연결
import { apis } from '../../shared/api';
import jwtDecode from 'jwt-decode';




const Stomp = require('@stomp/stompjs');

const client = new Stomp.Client({
  brokerURL: 'ws://54.180.96.119/ws-stomp',
  connectHeaders: {
    login: 'user',
    passcode: 'password',
  },
  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});
const active = () => {
  client.onConnect = function (frame) {
    // Do something, all subscribes must be done is this callback
    // This is needed because this will be executed after a (re)connect
  };
  client.onStompError = function (frame) {
    // Will be invoked in case of error encountered at Broker
    // Bad login/passcode typically will cause an error
    // Complaint brokers will set `message` header with a brief message. Body may contain details.
    // Compliant brokers will terminate the connection after any error
    console.log('Broker reported error: ' + frame.headers['message']);
    console.log('Additional details: ' + frame.body);
  };
  
  client.activate();
}



// actions
const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';
const GET_USER = 'GET_USER';
const GET_ALL_USER = 'GET_ALL_USER';

// action creators
const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const getAllUser = createAction(GET_ALL_USER, (user_list) => ({ user_list }));


// initialState
const initialState = {
  username: '',
  nickname: '',
  user_profile: '',
  is_loaded: false,
  is_login: false,
};

// middleware actions

const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    console.log("LogInDB :", id, "/", pwd)

    apis.login(id, pwd)
      .then((response) => {
        console.log("LogInDB : response", response)

        const token = response.headers.authorization.split(" ")[1];
        const decode = jwtDecode(token);

        sessionStorage.setItem("token", token);

        const user_data = {
          username: decode.USER_NAME,
          nickname: decode.NICKNAME,
          id: decode.USER_ID,
        }

        dispatch(setUser(user_data));
        history.replace('/chat');

      }).catch((error) => {
        alert("아이디와 비밀번호를 다시 확인해주세요.")
      });
  }
};


const signupFB = (id, usernickname, pwd, pwcheck) => {
  return function (dispatch, getState, { history }) {
    console.log("username : " + id, "password : " + pwd, '전송, sessionID 요청');

    apis.signup(id, usernickname, pwd, pwcheck)
      .then((response) => {
        window.alert("환영합니다!\n회원가입이 완료되셨습니다");
        history.replace('/');
      })
      .catch((error) => {
        console.log(error.response);
      })

  }
};

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {

    apis.islogin()
      .then((response) => {
          dispatch(setUser(response.data))
        
      }).catch((error) => {
        console.log(error.response);
      });
  }
};

const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    dispatch(logOut());
    history.replace('/');
  }
};

const getAllUserDB = () => {
  return function (dispatch, getState, { history }) {
    apis.getAllUser()
      .then((response) => {
        // console.log("getAllUserDB : response", response.data)
        dispatch(getAllUser(response.data));
      }).catch((error) => {
        console.log(error.response);
      })
  }
}



// reducer 
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log('SET_USER : user', action.payload.user);
        draft.user = action.payload.user;
        draft.is_login = true;
        draft.is_loaded = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        sessionStorage.removeItem('token');
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
        draft.is_loaded = true;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {

    }),
    [GET_ALL_USER]: (state, action) => produce(state, (draft) => {
      draft.user_list = action.payload.user_list;
    })
  },
  initialState
);

// action creator export
const actionCreators = {
  setUser,
  logOut,
  getUser,
  loginFB,
  signupFB,
  loginCheckFB,
  logoutFB,
  getAllUserDB,
};

export { actionCreators, client };