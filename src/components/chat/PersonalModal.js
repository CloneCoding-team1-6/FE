import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button, Grid2, Text } from "../../elements";


const PersonalModal = (props) => {
const history = useHistory();


  const Profile = () => {
    console.log("프로필!")
  }

  const LogOut = () => {
    console.log("로그아웃!")
    sessionStorage.removeItem("token");
    // dispatch(userActions.deleteUser());
    history.replace("/");
  }


  return (
    <React.Fragment>
      <ModalBox>
        <Grid2 onClick={() => {
          Profile();
        }}>
          <Text bold margin="0">프로필</Text>
        </Grid2>
        <hr />
        <Grid2 onClick={() => {
          LogOut();
        }}>
          <Text bold margin="0">로그아웃</Text>
        </Grid2>
      </ModalBox>
    </React.Fragment>
  );
}


const ModalBox = styled.div`
  text-align: center;
  width: 150px;
  height: fit-content;
`

const ButtonBox = styled.div`
  width: fit-content;
  height: fit-content;
`


export default PersonalModal; 