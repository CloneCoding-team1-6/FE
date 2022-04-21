import React from "react";
import styled from "styled-components";

import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Button, Grid } from "../../elements";
import { HiPaperAirplane } from "react-icons/hi";

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


const ChatInput = (props) => {

  const token = sessionStorage.getItem('token');
  const history = useHistory();

  // 보내는 사람
  const sender = useSelector((state) => state.user?.user?.username)
  // 보낼 메세지
  const [text, setText] = React.useState('');
  // 방 번호
  const roomId = useParams();  

  // 소켓 통신
  let sock = new SockJS('http://121.139.34.35:8080/ws-stomp');
  let ws = Stomp.over(sock);

  const blank = /^\s+|\s+$/g;
  // 메세지 보내기
  const onSend = async () => {
  try {
    if(text.target.value.replace(blank,'') === "") {
      return;
    }
    if (!token) {
      alert('문제가 발생했습니다. 다시 로그인 해주세요.');
      history.replace('/');
    }

    // 보낼 데이터 
    const message = {
      roomId: roomId.roomid,
      message: text.target.value,
      sender: sender,
      type: 'TALK',
    }
    
    waitForConnection(ws, function () {
      // 콘솔창에 메세지 출력되지 않도록 설정
      ws.debug = null;
      ws.send(
        '/pub/api/chat/message',
        { token: token },
        JSON.stringify(message)
      );
      text.target.value="";
    });
  } catch (error) {
    // console.log(error.response);
  }
}

// 웹소켓이 연결될 때 까지 실행
  function waitForConnection(ws, callback) {
    setTimeout(
      function () {
        if (ws.ws.readyState === 1) {
          callback();
        } else {
          waitForConnection(ws, callback);
        }
      },
      1
    );
  }

  // 엔터키 이벤트
  const enterEvent = (e) => {
    if(e.key === 'Enter') {
      onSend();
    }
  }

  return (
    <React.Fragment>
    <Grid width="100%">
      <Center>
        <Box>
          <Box2 bg="#fafafa" br="6px 6px 0 0"/>
            <InputBox onChange={setText} onKeyPress={enterEvent}/>

          <Button sendBtn _onClick={onSend} value={text}>
            <HiPaperAirplane color="#aaa" size="18px" transform="rotate(90)"/>
          </Button>

        </Box>
      </Center>
      </Grid>
    </React.Fragment>
  );

}

const InputBox = styled.textarea`
    position: absolute;
    top: 40px;

    padding: 10px;

    width: 98%;
    height: 60px;

    resize: none;

    font-family: 'Pretendard-Regular';
    font-size: 1em;

    border: none;

    &:focus {
        outline: none;
    }
`
const Center = styled.div`
    width: 100%;
    
    margin: auto;
`
const Box = styled.div`
    position: absolute;
    bottom: 20px;

    width: 100%;
    height: 130px;

    border: 1px solid #ddd;
    border-radius: 8px;

`
const Box2 = styled.div`
    position: absolute;
    bottom: ${(props) => props.bt};

    margin: auto;

    width: 100%;
    height: 40px;

    border-radius: ${(props) => props.br};
    background: ${(props) => props.bg};
`

export default ChatInput;