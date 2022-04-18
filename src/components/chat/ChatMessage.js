import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../../elements";





const ChatMessage = (props) => {

  const {message, nickName, createdAt} = props;

  return (
    <React.Fragment>
      <OuterBox>
        <InnerBox>
          <Grid is_flex width="70vw">
            <ImageBox />
            <MessageBox>
              <Grid is_flex width="fit-content" height="30px">
                <Text bold margin="0">{nickName}</Text>
                <Text margin="0 10px" size="0.8em">{createdAt}</Text>
              </Grid>
              <Grid width="fit-content" margin="0">
                <Text margin="0 0">{message}</Text>
              </Grid>
            </MessageBox>
          </Grid>
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

  background-image: url('https://i.pinimg.com/474x/19/08/a7/1908a7eae6903f9d5861b62b1e025788.jpg');
  background-size: cover;
  border-radius: 4px;
`

const MessageBox = styled.div`
  margin: 10px;

  width: 100%;
  height: 56px;
`


export default ChatMessage;