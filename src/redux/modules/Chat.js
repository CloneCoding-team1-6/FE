import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import thunk from "redux-thunk";

import Axios from "../../shared/request";
import { RESP } from "../../shared/response";


// 액션 
const GET_CHAT_ROOM = "GET_CHAT_ROOM";
const ADD_CHAT_ROOM = "ADD_CHAT_ROOM";
const GET_MESSAGE = "GET_MESSAGE";

// 초기값
const initialState = {
  list: [

  ],
}

// 액션 생성

//채팅방
const getChatRoom = createAction(GET_CHAT_ROOM, (chat_list) => ({ chat_list }));
const addChatRoom = createAction(ADD_CHAT_ROOM, (room) => ({ room }));

// 채팅 메세지
const getMessage = createAction(GET_MESSAGE, (message) => ({message}));
const sendMessage = createAction('chat/WRITEMESSAGE');



// 미들웨어

// 방 목록 가져오기
const getChatRoomDB = () => {
  return async function (dispatch, getState, { history }) {
    // Axios
    // .get('/api/chat')
    // .then((response) => {
    //     console.log("getChatRoomDB : response", response);
    // }).catch((error) => {
    //     console.log("getChatRoomDB : ERROR", error.response)
    // })

    const response = RESP.GET_CHAT_ROOM;
    console.log("getChatRoomDB : response", response);
    dispatch(getChatRoom(response));
  }
}

// 채팅방 추가하기
const addChatRoomDB = (roomName) => {
  return async function (dispatch, getState, { history }) {
    console.log("addChatRoomDB : roomName", roomName)
    const room = {
      roomId: 1,
      roomName: roomName,
    }
    // Axios
    // .post('/api/chat', roomName)
    // .then((response) => {
    //     console.log("addChatRoomDB : response", response);
    //     dispatch(addChatRoom(roomName));    
    // }).catch((error) => {
    //     console.log("addChatRoomDB : ERROR", error.response)
    // })

    // 서버 연결시 삭제
    dispatch(addChatRoom(room));
  }
}

// 이전 메세지 가져오기
const getMessageDB = (roomId) => {
  return async function (dispatch, getState, { history }) {
    // Axios.get(`api/chat/${roomId}`)
    // .then((response) => {
    //   console.log("getMessageDB : response", response);
    //   dispatch(getMessage(response.data));
    // }).catch((error) => {
    //   console.log("getMessageDB : ERROR", error);
    // })
    const response = RESP.GET_MESSAGE;
    console.log("getMessageDB : response", response);
    dispatch(getMessage(response));
  }
}







// 리듀서

export default handleActions(
  {
    [GET_CHAT_ROOM]: (state, action) => produce(state, (draft) => {
      console.log("GET_CHAT_ROOM : chat_list", action.payload.chat_list)
      draft.list = action.payload.chat_list;
    }),
    [ADD_CHAT_ROOM]: (state, action) => produce(state, (draft) => {
      console.log("ADD_CHAT_ROOM : room", action.payload.room)
      draft.list.push(action.payload.room);
      draft.is_open = false;
    }),
    [GET_MESSAGE]: (state, action) => produce(state, (draft) => {
      console.log("GET_MESSAGE : message", action.payload.message)
      draft.message = action.payload.message;
      // draft.message.push(action.payload);
    }),
    [sendMessage]: (state, action) => produce(state, (draft) => {
      draft.sendMessage = action.payload;
    })
  },
  initialState
)









const ChatRoomCreators = {
  getChatRoom,
  getChatRoomDB,
  
  addChatRoom,
  addChatRoomDB,
  
  getMessage,
  getMessageDB,

  sendMessage,

}

export { ChatRoomCreators };