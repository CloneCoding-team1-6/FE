import React from "react";
import styled from "styled-components";
import { Text } from "../../elements";
import { GoChevronDown } from "react-icons/go";

import ChattingBox from "./ChatMessageBox";


const ChatRoom = () => {
  return (
    <React.Fragment>
      <ChatBox>
        <ChatRoomHeader>
          <Text bold margin="0 20px" size="1.2em">
            # 일반 
            <GoChevronDown size="15px"/>
          </Text>
        </ChatRoomHeader>
      <ChattingBox/>
      </ChatBox>
    </React.Fragment>
  );
}

const ChatBox = styled.div`

    width: 100%;
    height: 100%;
    max-height: 100vh;

    background: #fff;
`
const ChatRoomHeader = styled.div`
  width: 100%;
  height: 50px;
  line-height: 50px;

  border-bottom: 1px solid #ddd;
`


export default ChatRoom;