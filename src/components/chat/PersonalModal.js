import React from "react";
import styled from "styled-components";
import { Button, Grid, Text } from "../../elements";


const PersonalModal = (props) => {

  return (
    <React.Fragment>
      <ModalBox>
        <Text bold margin="0">프로필</Text>
        <hr />
        <Text bold margin="0">로그아웃</Text>
      </ModalBox>
    </React.Fragment>
  );
}


const ModalBox = styled.div`
  text-align: center;
  width: 150px;
  height: fit-content;
`

export default PersonalModal; 