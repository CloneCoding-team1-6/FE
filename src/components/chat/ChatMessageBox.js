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
// import { client } from "../../redux/modules/User";


const ChattingBox = () => {

  const token = sessionStorage.getItem("token");
  let sock = new SockJS('http://121.139.34.35:8080/ws-stomp');
  let ws = Stomp.over(sock);

  const dispatch = useDispatch();
  // 방 번호
  const roomId = useParams();

  // 연결하고 구독하기
  function ConnectSub() {
    try {
      ws.connect({
        token: token
      }, () => {
          ws.subscribe(
            `/sub/api/chat/rooms/${roomId.roomid}`,
            (response) => {
              // console.log("받은 메세지", response);
              const newMessage = JSON.parse(response.body);
              console.log("받은 메세지", newMessage);
              dispatch(ChatCreators.subMessage(newMessage));
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

  function DisConnectUnsub() {
    try {
      ws.disconnect( {
        token: token
      }, () => {
          ws.unsubscribe('sub-0');
        },
        { token: token }
      );
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    ConnectSub();
    return () => {
      DisConnectUnsub();
    };
  }, [roomId.roomid]);

  // 이전 메세지 가져오기
  const message = useSelector((state) => state.chat?.message)
  React.useEffect(() => {
    dispatch(ChatCreators.getMessageDB(roomId.roomid));
  }, [roomId.roomid])

  const messageRef = React.useRef();

  const scrollToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  };
  React.useEffect(() => {
    scrollToBottom();
  }, [message]);





  return (
    <Wrapper>
      <MessageWrapper ref={messageRef}>

        {message?.map((message, idx) => {
          return (
            <ChatMessage 
              key={idx} 
              message={message?.message} 
              imgUrl={message?.user?.imgUrl}
              createdAt={message?.createdAt}
              nickName={message?.user?.nickname} /> 

          );
        })}


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