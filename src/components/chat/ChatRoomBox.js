import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { actionCreators as userActions } from "../../redux/modules/User";
import { ChatActions } from "../../redux/modules/Chat";

import { Text, Grid2 } from "../../elements";
import { GoChevronDown } from "react-icons/go";

import ChatMessageBox from "./ChatMessageBox";


const ChatRoom = () => {

  const dispatch = useDispatch();

  const params = useParams();
  const roomId = params.roomid;
  const userName = React.useRef(null);
  const user_list = useSelector((state) => state.user?.user_list);
  const roomName = useSelector((state) => state.chat?.room?.roomName);
  const username = useSelector((state) => state.user?.user?.username);

  const email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  // 유저 초대하기
  const inviteUser = () => {
    if (userName.current.value === "") {
      userName.current.value = "";
      return window.alert("사용자 아이디를 입력해주세요!")
    }
    if (!email.test(userName.current.value)) {
      userName.current.value = "";
      return window.alert("이메일 형식의 아이디를 입력해주세요.")
    }
    if (userName.current.value === username) {
      userName.current.value = "";
      return window.alert("본인은 초대할 수 없습니다")
    }
    dispatch(ChatActions.inviteUserDB(roomId, userName.current.value));
    setIsOpen(false);
  }

  // 방 퇴장하기
  const leaveRoom = () => {
    dispatch(ChatActions.leaveRoomDB(roomId));
  }

  // 모달 여닫기
  const [isOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
  }

  // 모든 유저 정보 가져오기
  React.useEffect(() => {
    dispatch(userActions.getAllUserDB())
  }, [])


  return (
    <React.Fragment>
      <ChatBox>
        <ChatRoomHeader>
          <Text bold margin="0 20px" size="1.2em">
            # {roomName}
            <GoChevronDown size="15px" />
            <BtnBox>
              {roomId === "1" ? null : <AddBtn onClick={openModal}>초대하기</AddBtn>}
              {roomId === "1" ? null : <OutBtn onClick={leaveRoom}>퇴장하기</OutBtn>}
            </BtnBox>
          </Text>
        </ChatRoomHeader>
        <ChatMessageBox />
        <Modal
          isOpen={isOpen}
          ariaHideApp={false}
          onRequestClose={() => setIsOpen(false)}
          style={{
            overlay: {
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)'
            },
            content: {
              position: 'absolute', margin: 'auto', width: 'fit-content', height: 'fit-content', background: '#fff',
              overflow: 'auto', borderRadius: '10px', WebkitOverflowScrolling: 'touch', outline: 'none',
            }
          }}>
          <ModalBox>
            <Text bold margin="0" size="1.5em"># 사용자 추가</Text>
            <ModalInput placeholder=" 예: user@aaa.com " ref={userName} />
            <Grid2>
              <ModalBtn onClick={inviteUser}>추가</ModalBtn>
            </Grid2>
            <Text bold size="1.2em"># 사용자 목록</Text>
            <ListBox>
              {user_list?.map((user, idx) => {
                return (
                  <Text key={user.id}>- {user?.nickname} ({user?.username})</Text>
                );
              })}
            </ListBox>
          </ModalBox>
        </Modal>
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
  position: relative;

  display: flex;
  width: 100%;
  height: 50px;
  line-height: 50px;

  border-bottom: 1px solid #ddd;
`
const ModalBox = styled.div`
    position: relative;
    margin-bottom : 40px;

    padding: 10px;
    width: 470px;
    height: fit-content;
`
const BtnBox = styled.div`
  position: absolute;
  top: 0;
  right: 10px;

  width: fit-content;
  height: fit-content;
`
const AddBtn = styled.button`
  font-family: 'Pretendard-Regular';

  width: 70px;
  height: 25px;

  border: none;
  border-radius: 5px;

  background: #007a5a;

  font-size: 0.7em;
  font-weight: 800;
  color: #fff;

  &: hover {
    background: #449E79;
  }
`
const OutBtn = styled.button`
  font-family: 'Pretendard-Regular';
  margin-left: 5px;
  width: 70px;
  height: 25px;

  border: none;
  border-radius: 5px;

  background: #eee;

  font-size: 0.7em;
  font-weight: 800;
  color: #007a5a;

  &: hover {
    background: #ddd;
    color: #007a5a;
  }
`
const ModalInput = styled.input`
font-family: 'Pretendard-Regular';

box-sizing: border-box;
margin: 25px 0;
padding: 0 10px;

width: 100%;
height: 40px;

font-size: 1em;
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
right: 10px;
bottom: -30px;

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
const ListBox = styled.div`
  height: 300px;
  overflow: auto;
`


export default ChatRoom;