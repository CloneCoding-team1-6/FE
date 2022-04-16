import React from "react";
import styled from "styled-components";
import { Grid, Text, Button } from "../../elements";
import { GoChevronDown, GoTriangleDown } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import Modal from "react-modal";
import AddChatModal from "./AddChatModal";

const ChatList = (props) => {

  const [isOpen, setIsOpen] = React.useState(false);

  console.log(isOpen);
  
  return (

    <React.Fragment>
      <ListBox>
      
        <ListElement height="50px" border="#522653">
          <Grid is_flex>
            <Text margin="0 10px" bold size="1.2em" color="#fff">새 워크스페이스 <GoChevronDown size="15px"/> </Text>
            <Button writeBtn>
              <FiEdit size="18px" color="#3F0E40" />
            </Button>
          </Grid>
        </ListElement>
            
            <ListElement height="30px">
                <Text margin="0 15px" size="1em" color="#A6A6BC"><GoTriangleDown size="13px"/>　채널</Text>
            </ListElement>

            <ListElement height="30px">
              <Grid margin="0 20px">
                <Text margin="0 15px" size="1em" color="#A6A6BC">#　일반</Text>
              </Grid> 
            </ListElement>

            <ListElement height="30px">
              <Grid margin="0 20px">
                <Text margin="0 15px" size="1em" color="#A6A6BC">#　6기 B반 잡담방</Text>
              </Grid> 
            </ListElement>

            <ListElement height="30px">
              <Grid margin="0 20px">
                <Text margin="0 15px" size="1em" color="#A6A6BC">#　6기 B반 질문방</Text>
              </Grid> 
            </ListElement>

            <ListElement height="30px" bg="#350D36" onClick={() => setIsOpen(true)}>
              <Grid is_flex margin="0 20px" >
                <Text margin=" 40px" size="1em" color="#A6A6BC">
                <Button addBtn >+</Button>채널 추가</Text>
              </Grid> 
            </ListElement>

        <Modal 
        isOpen={isOpen} 
        ariaHideApp={false} 
        onRequestClose={() => setIsOpen(false)}
        style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.75)'
            },
              content: {
              position: 'absolute',
              margin: 'auto',
              width: 'fit-content',
              height: 'fit-content',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              outline: 'none',
            }
            }}>
            <AddChatModal/>
        </Modal>
      </ListBox>
    </React.Fragment>
    
  );
}

const ListBox = styled.div`
    overflow: hidden;

    width: 260px;
    height: 100vh;
    
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


export default ChatList;