import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { setCookie, deleteCookie } from "../../shared/Cookie";
// import { auth } from '../../shared/firebase';
// 서버와 연결
import { apis } from '../../shared/api';
import jwtDecode from 'jwt-decode';


// actions
const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';
const GET_IMAGE = 'GET_IMAGE';
const GET_ALL_USER = 'GET_ALL_USER';

// action creators
const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getImage = createAction(GET_IMAGE, (imgUrl) => ({ imgUrl }));
const getAllUser = createAction(GET_ALL_USER, (user_list) => ({ user_list }));


// initialState
const initialState = {
  username: '',
  nickname: '',
  imgUrl: '',
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

        // dispatch(setUser(user_data));
        dispatch(loginCheckFB());
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
        console.log("loginCheckDB", response);
        if (response.data) {
          console.log(response.data.user);
          dispatch(setUser({...response.data}))
        } else {
          console.log("유저데이터 없음");
          dispatch.logOut();
        }
      }).catch((error) => {
        console.log("토큰 전달 오류", error);
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
    [GET_IMAGE]: (state, action) => produce(state, (draft) => {
      draft.user.push(action.payload.imgUrl);
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
  loginFB,
  signupFB,
  loginCheckFB,
  logoutFB,
  getAllUserDB,
  getImage,
};

export { actionCreators };