import React from "react";
import styled from "styled-components";

import { Grid2, Text } from "../../elements";


const ChatMessage = (props) => {

  const {message, nickName, createdAt, imgUrl} = props;

  return (
    <React.Fragment>
      <OuterBox>
        <InnerBox>
          <Grid2 is_flex width="70vw" height="fit-content">
            <ImageBox src={imgUrl}/>
            <MessageBox>
              <Grid2 is_flex width="fit-content" height="30px">
                <Text bold margin="0">{nickName}</Text>
                <Text margin="0 10px" size="0.8em">{createdAt}</Text>
              </Grid2>
              <Grid2 width="fit-content" margin="0">
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
  margin: 0 20px;

  height: 70px;
`

const ImageBox = styled.div`
  width: 40px;
  height: 40px;

  background-image:  url('${(props)=>props.src? props.src: 'https://ca.slack-edge.com/T01L2TNGW3T-U02SDJ4A1JN-g7cf4a9a2c7b-512' }');
  background-size: cover;
  backgroud-repeat: no-repeat;
  backgroud-position: center center;
  border-radius: 4px;
`

const MessageBox = styled.div`
  margin: 10px;

  width: 100%;
  height: 56px;
`


export default ChatMessage;