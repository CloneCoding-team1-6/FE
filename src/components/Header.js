import React from "react";
import styled from "styled-components";
import { Grid } from "../elements";
import { IoSearch } from "react-icons/io5";
import { BiTime } from "react-icons/bi";
import { GrCircleQuestion } from "react-icons/gr";


const Header = () => {

  return (
    <React.Fragment>
      <HeaderBox>
        <Grid margin="auto" width="680px" is_flex>
          <OuterBox>
            <BiTime className="icon1" color="#fff" size="20px"/>
            <IoSearch className="icon2" color="#fff" size="20px" />
            <InputBox placeholder="새 워크스페이스 검색"></InputBox>
          </OuterBox>
          <ImageBox />
        </Grid>
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

  .icon1 {
    position: absolute;
    top: 4px;
    left: -30px;
    }
  .icon2 {
    position: absolute;
    top: 4px;
    right: 10px;
  }
`

const InputBox = styled.input`
  font-family: 'Pretendard-Regular';

  padding: 0 10px;
  width: 60vw;
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

  background-image: url('https://i.pinimg.com/474x/19/08/a7/1908a7eae6903f9d5861b62b1e025788.jpg');
  background-size: cover;
  ${'' /* background: #ddd; */}
`


export default Header;
