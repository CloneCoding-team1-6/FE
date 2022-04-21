import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { actionCreators as userActions } from "../../redux/modules/User";

import { Text } from "../../elements";
import { FiX } from "react-icons/fi";

import UserProfile from "../UserProfile";



const PersonalModal = (props) => {

  const dispatch = useDispatch();
  const history = useHistory();
  
  // 모달 여닫기
  const [isOpen, setIsOpen] = React.useState(false);
  const Profile = () => {
    setIsOpen(true);
  }

  // 로그아웃
  const LogOut = () => {
    sessionStorage.removeItem("token");
    dispatch(userActions.logoutFB());
    history.replace("/");
  }


  return (
    <React.Fragment>
      <ModalBox>
        <ButtonBox onClick={() => {
          Profile();
          }}>
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
            content: { position: 'absolute', margin: 'auto', padding: '30px 20px', width: 'fit-content', height: 'fit-content', background: '#fff',
              overflow: 'auto', WebkitOverflowScrolling: 'touch', outline: 'none',
            }}}>
        <IconBox>
          <FiX className="icon" onClick={() => {
            setIsOpen(false)
                }} />
        </IconBox>
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

const IconBox = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: fit-content;
  height: fit-content;

`


export default PersonalModal; 