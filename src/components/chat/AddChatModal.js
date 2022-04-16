import React from "react";
import styled from "styled-components";
import { Button, Grid, Text } from "../../elements";


const AddChatModal = () => {

  const roomNameRef = React.useRef(null);

  const roomCreate = () => {
    const roomName = roomNameRef.current.value;
    console.log(roomName);
  }


  return (
    <React.Fragment>
      <ModalBox>
        <Text bold margin="0" size="1.8em">채널 생성</Text>
        <Text color="#858485" > 채널은 팀이 소통하는 공간입니다. 채널은 주제(예:마케팅)를 중심으로 구성하는 것이 가장 좋습니다.</Text>
        <Grid height="fit-content">
          <Text bold margin="10px 0">이름</Text>
          <ModalInput ref={roomNameRef} />
        </Grid>
        <Grid padding="15px 0" height="fit-content">
          <Text bold margin="10px 0">설명(옵션)</Text>
          <ModalInput />
          <Text color="#858485" margin="5px 0" size="0.9em">무엇에 대한 채널인가요?</Text>
        </Grid>
        <Grid is_flex height="fit-content">
          <Grid margin="10px 0" width="300px">
            <Text bold margin="0">비공개로 만들기</Text>
            <Text margin="5px 0">채널이 비공개로 설정된 경우 초대를 통해서만 조회 또는 참여할 수 있습니다.</Text>
          </Grid>
          <Grid width="130px" />
          <Grid width="fit-content">
            <Button toggleBtn />
          </Grid>
        </Grid>
          <ModalBtn onClick={roomCreate}>
            생성
            {/* <Text margin="0" bold>생성</Text> */}
          </ModalBtn>
      </ModalBox>
    </React.Fragment>
  );
}

const ModalBox = styled.div`
    position: relative;

    padding: 30px;
    width: 470px;
    height: 450px;

    border-radius: 10px;
`

const ModalInput = styled.input`
    box-sizing: border-box;
    padding: 0 10px;
    width: 100%;
    height: 40px;
    border: 1px solid #bababa;
    border-radius: 5px;
    

    transition: 0.05s;
    &:focus {
        border: 1px solid #1264a3;
        outline: 4px solid #bae1f1;
    }
`

const ModalBtn = styled.button`
    font-family: 'Pretendard-Regular';
    font-weight: 700;
    font-size: 0.9em;

    position: absolute;
    right: 30px;
    bottom: 30px;
    
    width: 80px;
    height: 35px;

    border: none;
    border-radius: 5px;

    background: #ddd;
    
    &:hover {
      background: #007a5a;
      color: #fff
    }
`

export default AddChatModal; 