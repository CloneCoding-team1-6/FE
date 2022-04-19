import React from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ChatCreators } from "../../redux/modules/Chat";

// import Stomp from 'react-stomp';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


  // 소켓 통신
  let sock = new SockJS('http://54.180.96.119/chatting');
  let ws = Stomp.over(sock);

const ChattingBox = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");

  // 방 번호
  const roomId = useParams();
  const roomNum = parseInt(roomId);
  // 렌더링시 구독 
  // 페이지 이동시 구독 해제


  // let headers = {Authorization: sessionStorage.getItem()}
  // 연결하고 구독하기
  function ConnectSub(token) {
    try {
      ws.connect({token: token}, {token: token}, async () => {
          ws.subscribe(
            `sub/api/chat/rooms/${roomNum}`,
            (data) => {
              const newMessage = JSON.parse(data.body);
              dispatch(ChatCreators.getMessageDB(newMessage));
            },
            {
                token: token 
            }
          );
        }
      );
    } catch (error) {
      console.log("fdfdfdfdf", error.response);
    }
  }

  // 연결 및 구독 해제
  function DisConnectUnsub() {
    // console.log(token)
    try {
      ws.disconnect( {
        connectHeaders: {
        "token": token,
      }},
        () => {
          ws.unsubscribe('sub-0');
        },
        { token: token }
      );
    } catch (error) {
      console.log(error);
    }
  }

  // 웹소켓이 연결될 때 까지 실행
  function waitForConnection(ws, callback) {
    setTimeout(
      function () {
        // 연결되었을 때 콜백함수 실행
        if (ws.ws.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(ws, callback);
        }
      },
      1 // 밀리초 간격으로 실행
    );
  }

  React.useEffect(() => {
    ConnectSub(token);
    return () => {
      DisConnectUnsub();
    };
  }, []);

  // 이전 메세지 가져오기
  React.useEffect(() => {
    // dispatch(ChatCreators.getMessageDB());
  }, [])

  return (
    <Wrapper>
      <MessageWrapper>

        {/* {message?.map((message, idx) => {
          return (
            <ChatMessage 
              key={idx} 
              message={message?.message} 
              nickName={message?.nickName} 
              createdAt={message?.createdAt} />
          );
        })} */}


      </MessageWrapper>
      <InputWrpper>
        <ChatInput />
      </InputWrpper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: block;
  width: 100%;
  height: 100vh;
`
const MessageWrapper = styled.div`
  width: 100%;
  height: 80%;
  overflow-y: scroll;
`
const InputWrpper = styled.div`
  position: absolute;
  margin: auto;
  left: 280px;
  right: 20px;
  bottom : 0;


  height: 20%;

  backgroud: #fff;
`
export default ChattingBox;