import React from "react";
import styled from "styled-components";

import { Grid2, Text } from "../../elements";


const ChatMessage = (props) => {

  const {message, nickName, createdAt, imgUrl} = props;
  
  const time = createdAt.split(" ");
  // 오전 / 오후
  const type = time[1]
  // 시
  const hour = time[0].split(":")[0];
  // 분
  const minute = time[0].split(":")[1];

  return (
    <React.Fragment>
      <OuterBox>
        <InnerBox>
          <Grid2 is_flex width="70vw" height="fit-content">
            <ImageWrapper>
            <Grid2 width="40px" height="40px">
              <ImageBox src={imgUrl}/>
            </Grid2>
            </ImageWrapper>
            <MessageBox>
              <Grid2 is_flex width="fit-content" height="fit-content">
                <Text bold margin="0">{nickName}</Text>
                <Text margin="0 10px" size="0.8em">{type} {hour}:{minute}</Text>
              </Grid2>
              <Grid2 width="fit-content" margin="5px 0">
                <Text margin="0 0">{message}</Text>
              </Grid2>
            </MessageBox>
          </Grid2>
        </InnerBox>
      </OuterBox>
    </React.Fragment>
  );
}

const OuterBox = styled.div`
  width: 100%;
  &: hover {
    background: #fafafa;
  }
`

const InnerBox = styled.div`
  position: relative;
  margin: 0 20px;

  height: fit-content;
  min-height: 70px;
`

const ImageWrapper = styled.div`
`

const ImageBox = styled.div`
  position: absolute;
  top: 13px;

  width: 40px;
  height: 40px;

  background-image:  url('${(props)=>props.src? props.src: 'https://ca.slack-edge.com/T01L2TNGW3T-U02SDJ4A1JN-g7cf4a9a2c7b-512' }');
  background-size: cover;
  backgroud-repeat: no-repeat;
  backgroud-position: center center;
  border-radius: 4px;
`


const MessageBox = styled.div`
  word-break: break-all;
  margin: 10px;

  width: 100%;
  height: fit-content;

`


export default ChatMessage;