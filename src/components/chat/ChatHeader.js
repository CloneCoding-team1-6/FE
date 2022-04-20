import React from "react";
import styled from "styled-components";

import { Grid2 } from "../../elements";
import { IoSearch } from "react-icons/io5";
import { BiTime } from "react-icons/bi";

import Modal from "react-modal";

import PersonalModal from "./PersonalModal";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/User";


const Header = () => {
    const dispatch = useDispatch();
    const [ModalisOpen, setModalIsOpen] = React.useState(false);

    const imgUrl = useSelector((state) => state.user?.user?.imgUrl);

    console.log("HEADER : IMGURL ", imgUrl);

    React.useEffect(() => {
      dispatch(userActions.loginCheckFB());
    }, [])

    return (
        <React.Fragment>
            <HeaderBox>
                <Grid2 margin="auto" width="680px" is_flex>
                    <OuterBox>
                        <BiTime className="icon1" color="#fff" size="20px" />
                        <IoSearch className="icon2" color="#fff" size="20px" />
                        <InputBox placeholder="새 워크스페이스 검색"></InputBox>
                    </OuterBox>
                    <ImageBox onClick={() => { setModalIsOpen(true) }} src={imgUrl}/>
                </Grid2>
                {ModalisOpen ? <Modal
                    isOpen={ModalisOpen}
                    ariaHideApp={false}
                    onRequestClose={() => setModalIsOpen(false)}
                    style={{
                        overlay: {
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0)'
                        },
                        content: {
                            position: 'absolute', top: '38px', left: '83vw', width: 'fit-content', height: 'fit-content', background: '#fff',
                            overflow: 'auto', WebkitOverflowScrolling: 'touch', outline: 'none',
                        }
                    }}>
                    <PersonalModal />
                </Modal> : null}
            </HeaderBox>
        </React.Fragment>
    );
}

const HeaderBox = styled.div`
    width: 100%;
    height: 40px; 
    background: #350D36;
`

const OuterBox = styled.div`
  display: flex;
  position: relative;  
  margin: auto;

  width: 70vw;
  height: 30px;

  .icon1 {
    position: absolute;
    top: 4px;
    left: -30px;
    }
  .icon2 {
    position: absolute;
    top: 4px;
    right: 0px;
    border: 3px solid black;
  }
`

const InputBox = styled.input`
  font-family: 'Pretendard-Regular';
  position: absolute;

  top: 1px;
  left: 0px;
  right: 0px;

  padding: 0 10px;
  height: 28px;

  border: none;
  border-radius: 5px;

  background: #5d3d5e;

  color: #fff;
  &::placeholder {
    color: #fff;
    font-weight: 800;
  }
  &:hover {
    backgroud: #6f5170;
  }
  &:focus {
    outline: none;
  }
`

const ImageBox = styled.div`
  position: absolute;
  right: 15px;

  width: 30px;
  height: 30px;

  border-radius: 4px;

  background-image: url('${(props)=>props.src}');
  background-size: cover;
`


export default Header;
