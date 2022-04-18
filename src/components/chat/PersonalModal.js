import React from "react";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button, Grid2, Text } from "../../elements";
import UserProfile from "../UserProfile";

const PersonalModal = (props) => {
const history = useHistory();

const [isOpen, setIsOpen] = React.useState(false);

  const Profile = () => {
    console.log("프로필!")
    setIsOpen(true);
  }

  const LogOut = () => {
    console.log("로그아웃!")
    localStorage.removeItem("token");
    // dispatch(userActions.deleteUser());
    history.replace("/");
  }


  return (
    <React.Fragment>
      <ModalBox>
        <ButtonBox onClick={Profile}>
          <Text bold margin="0">프로필</Text>
        </ButtonBox>
        <hr />
        <ButtonBox onClick={LogOut}>
          <Text bold margin="0">로그아웃</Text>
        </ButtonBox>
      </ModalBox>
      
      
      <Modal 
      isOpen={isOpen} 
      ariaHideApp={false} 
      onRequestClose={() => 
      setIsOpen(false)}
          style={{
            overlay: {
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)'
            },
            content: { position: 'absolute', margin: 'auto', width: 'fit-content', height: 'fit-content', background: '#fff',
              overflow: 'auto', WebkitOverflowScrolling: 'touch', outline: 'none',
            }}}>

        <UserProfile/>
      
      </Modal>
    
    
    </React.Fragment>
  );
}


const ModalBox = styled.div`
  text-align: center;
  width: 150px;
  height: fit-content;
`

const ButtonBox = styled.div`
  margin: auto;
  width: 100%;
  height: fit-content;
`


export default PersonalModal; 