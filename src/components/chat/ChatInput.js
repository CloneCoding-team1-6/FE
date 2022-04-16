import React from "react";
import styled from "styled-components";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Chat } from "@material-ui/icons";
import { Button, Grid } from "../../elements";
import { HiPaperAirplane } from "react-icons/hi";


import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';

const ChatInput = (props) => {

  const { _onChange } = props;

  // let sock = new SockJS('');
  // let ws = Stomp.over(sock);

  // 보내는 사람
  const sender = useSelector((state) => state)
  // 보낼 메세지
  const [text, setText] = React.useState('');
  
  // 방
  const roomId = useParams();  


  const onSend = async () => {

    console.log(text.target.value);
    
    const message = {
      roomId : roomId,
      message: text.target.value,
      sender: sender,
      type: 'CHAT',
    }
    
    if (text.target.value === "") {
      return;
    }

    const token = await sessionStorage.getItem('token');

  //   ws.send(
  //     'api/chat/message',
  //     {
  //       token: token,
  //     },
  //     JSON.stringify(message)
  //   )

  // )

    text.target.value = "";
  };




  return (
    <React.Fragment>
    <Grid width="100%">
      <Center>
        <Box>
          <Box2 bg="#fafafa" br="6px 6px 0 0"/>
            <InputBox onChange={setText}/>
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

    width: 94%;
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