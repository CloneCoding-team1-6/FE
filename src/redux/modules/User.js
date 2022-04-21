import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from '../../shared/api';


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

    apis.login(id, pwd)
      .then((response) => {

        const token = response.headers.authorization.split(" ")[1];
        sessionStorage.setItem("token", token);

        dispatch(loginCheckFB());
        history.replace('/chat/1');
      }).catch((error) => {
        alert("아이디와 비밀번호를 다시 확인해주세요.")
      });
  }
};


const signupFB = (id, usernickname, pwd, pwcheck) => {
  return function (dispatch, getState, { history }) {

    apis.signup(id, usernickname, pwd, pwcheck)
      .then((response) => {
        window.alert("환영합니다!\n회원가입이 완료되었습니다");
        history.replace('/');
      })
      .catch((error) => {
        console.log("signupDB : error", error.response);
      })

  }
};

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {

    apis.islogin()
      .then((response) => {
        if (response.data) {
          dispatch(setUser({...response.data}))
        } else {
          dispatch.logOut();
        }
      }).catch((error) => {
        console.log("loginCheckDB : error", error.response);
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
        // console.log('SET_USER : user', action.payload.user);
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        sessionStorage.removeItem('token');
        draft.user = null;
        draft.is_login = false;
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