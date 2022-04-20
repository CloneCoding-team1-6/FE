import React from "react";
import styled from "styled-components";
import Modal from "react-modal";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChatCreators } from "../../redux/modules/Chat";

import { Grid2, Text, Button } from "../../elements";
import { GoChevronDown, GoTriangleDown } from "react-icons/go";
import { FiEdit, FiX } from "react-icons/fi";


const ChatList = (props) => {
  const dispatch = useDispatch();

  // 모달 여닫기
  const [isOpen, setIsOpen] = React.useState(false);
  // console.log("ChatList : Modal isOpen", isOpen);

  const roomId = useParams();
  const ChatRoom = useSelector((state) => state.chat?.list);
  const roomNameRef = React.useRef(null);


  console.log("ChatList : roomId", roomId)
  // 채팅방 생성
  const roomCreate = () => {
    const roomName = roomNameRef.current.value;
    if(roomName==="") {
      window.alert("채널 이름을 입력해주세요!")
      return;
    }
    // if()
    console.log("AddChatModal : roomCreate : roomName", roomName);
    dispatch(ChatCreators.addChatRoomDB(roomName));
    setIsOpen(false);
  }



  // 채팅방 목록 가져오기
  React.useEffect(() => {
    dispatch(ChatCreators.getChatRoomDB());
  }, [dispatch])


  return (

    <React.Fragment>
      <ListBox>

        <ListElement height="50px" border="#522653">
          <Grid2 is_flex>
            <Text margin="0 10px" bold size="1.2em" color="#fff">새 워크스페이스 <GoChevronDown size="15px" /> </Text>
            <Button writeBtn>
              <FiEdit size="18px" color="#3F0E40" />
            </Button>
          </Grid2>
        </ListElement>

        <ListElement height="30px">
          <Text margin="0 15px" size="1em" color="#A6A6BC"><GoTriangleDown size="13px" />　채널</Text>
        </ListElement>


        {ChatRoom?.map((room) => {
          return (
            <ListElement key={room.id} height="30px" onClick={() => { 
              dispatch(ChatCreators.enterRoomDB(room.id) )}}>
              <Grid2 margin="0 20px">
                <Text margin="0 15px" size="1em" color="#A6A6BC">#　{room.chatRoomName}</Text>
              </Grid2>
            </ListElement>
          );
        })}

        <ListElement height="30px" bg="#350D36" onClick={() => setIsOpen(true)}>
          <Grid2 is_flex margin="0 20px" >
            <Text margin=" 40px" size="1em" color="#A6A6BC">
              <Button addBtn >+</Button>채널 추가</Text>
          </Grid2>
        </ListElement>

{isOpen? <Modal
          isOpen={isOpen} ariaHideApp={false} onRequestClose={() => setIsOpen(false)}
          style={{
            overlay: {
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)'
            },
            content: { position: 'absolute', margin: 'auto', width: 'fit-content', height: 'fit-content', background: '#fff',
              overflow: 'auto', WebkitOverflowScrolling: 'touch', outline: 'none',
            }}}>

          <ModalBox>
            <FiX className="icon" onClick={() => {
              setIsOpen(false)
              }}/>
            <Text bold margin="0" size="1.8em">채널 생성</Text>
            <Text color="#858485" > 채널은 팀이 소통하는 공간입니다. 채널은 주제(예:마케팅)를 중심으로 구성하는 것이 가장 좋습니다.</Text>
            <Grid2 height="fit-content">
              <Text bold margin="10px 0">이름</Text>
              <ModalInput ref={roomNameRef} />
            </Grid2>
            <Grid2 padding="15px 0" height="fit-content">
              <Text bold margin="10px 0">설명(옵션)</Text>
              <ModalInput />
              <Text color="#858485" margin="5px 0" size="0.9em">무엇에 대한 채널인가요?</Text>
            </Grid2>
            <Grid2 is_flex height="fit-content">
              <Grid2 margin="10px 0" width="300px">
                <Text bold margin="0">비공개로 만들기</Text>
                <Text margin="5px 0">채널이 비공개로 설정된 경우 초대를 통해서만 조회 또는 참여할 수 있습니다.</Text>
              </Grid2>
              <Grid2 width="130px" />
              <Grid2 width="fit-content">
                <Button toggleBtn />
              </Grid2>
              <ModalBtn
                onClick={() => {
                  roomCreate()
                }} >
                생성
              </ModalBtn>
            </Grid2>
          </ModalBox>
        </Modal> : null }
        

      </ListBox>
    </React.Fragment>

  );
}

const ListBox = styled.div`
    overflow: hidden;

    width: 260px;
    height: 100vh;

    background: #3F0E40;
    
`
const ListElement = styled.div`
  overflow: hidden;

  position: relative;
  box-sizing: border-box;
  
  width: 100%;

  background: ${(props) => props.bg};

  ${(props) => (props.height ? `height: ${props.height};` : "")};
  ${(props) => (props.height ? `line-height: ${props.height};` : "")};
  ${(props) => (props.border ? `border: 1px solid ${props.border};` : "")};
  &:hover {
    background: #350D36;
  }
`
const ModalBox = styled.div`
    position: relative;

    padding: 30px;
    width: 470px;
    height: 450px;

    border-radius: 10px;
    .icon {
      position: absolute;
      top: 12px;
      right: 12px;
    }
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

export default ChatList;