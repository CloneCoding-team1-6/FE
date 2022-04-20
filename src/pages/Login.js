import React from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';

import { idCheck } from '../shared/common';
import { actionCreators as userActions } from '../redux/modules/User';

import { HiOutlineSparkles } from "react-icons/hi";
import Google from '../assets/googlelogo.png';
import Apple from '../assets/applelogo.jpg';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

import Header from '../components/Header';



const Login = (props) => {
  const [id, setId] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [warning, setWarning] = React.useState(false);
  const dispatch = useDispatch();

  const login = () => {
    if (!idCheck(id)) {
      setWarning(true);
      window.alert('아이디 형식이 맞지 않습니다!');
      return;
    }
    if (id === '' || pwd === '') {
      window.alert('아이디와 비밀번호를 모두 입력해주세요!');
      return;
    }
    dispatch(userActions.loginFB(id, pwd))
  }


  return (
    <Page>
      <Header />
      <Main>
        <h1 style={{ fontSize: "48px", margin: "15px 0px 0px 0px" }}>이메일로 로그인해 보세요 </h1>
        <Subheader>
          <strong>직장에서 사용하는 이메일 주소</strong>로 로그인하는 걸 추천드려요.
        </Subheader>
        <Signin>
          <Button style={styles}
            color='primary'
            variant='outlined'>
            <img
              style={{ width: "15px", height: "15px", margin: "0px 10px 0px 0px" }}
              src={Google} >
            </img>
            <strong
              style={{ fontSize: "18px" }}>
              Google 계정으로 로그인
            </strong>
          </Button>
          <Button
            style={styles}>
              <img 
              style={{ height: "30px", margin: "0px 10px 0px 0px" }} 
              src={Apple} >
              </img>
              <strong 
              style={{ fontSize: "18px" }}>
              Apple 계정으로 로그인
              </strong>
            </Button>
          <div style={{ margin: "24px 0px 24px 0px", display: "flex", alignItems: "center" }}>
            <hr style={{ flexGrow: "1", margin: "0px 10px 0px 0px" }} />
            <div style={{ fontSize: "15px" }}>또는</div>
            <hr style={{ flexGrow: "1", margin: "0px 0px 0px 10px" }} />
          </div>
          <div>
            {warning ? (<TextField style={warninginput} onChange={(e) => {setId(e.target.value);}} />) 
            : (<TextField label="Email" style={inputstyles}onChange={(e) => {setId(e.target.value);}} />)}
            {warning ? (
              <Alert 
              style={{ 
                border: "1px solid rgba(224,30,94,.4)", 
                backgroundColor: "rgba(224,30,90,.1)", 
                fontWeight: "bold", margin: "0px 0px 24px 0px" }} 
              severity="warning">죄송합니다. 이메일이 유효하지 않습니다.</Alert>) : ("")}
            <TextField label="Password" 
              style={inputstyles} 
              onChange={(e) => {setPwd(e.target.value);}}
              type='password' />
          </div>
          <Button 
            variant='contained' 
            style={{ height: "44px", fontWeight: "bold", width: "100%", margin: "24px 0px 0px 0px", fontSize: "18px", color: "white", backgroundColor: "#4a154b" }} 
            onClick={() => {login();}}>이메일로 로그인</Button>
          <div style={{ margin: "24px 0px 0px 0px", background: "rgba(29,28,29,.05)", display: "flex", padding: "12px 24px", borderRadius: "8px" }}>
            <HiOutlineSparkles style={{ display: "inline-flex", position: "relative", width: "25px", height: "20px", alignContent: "center", justifyContent: "center" }} />
            <span style={{ fontSize: "15px", lineHeight: "1.46668", paddingLeft: "12px", color: "rgba(97,96,97,1)" }}>
              비밀번호 없이 로그인할 수 있도록 매직코드를 이메일로 보내드려요. 또는 <a style={{ color: "blue" }}>수동으로 로그인</a>하셔도 됩니다.
            </span>
          </div>
        </Signin>
      </Main>
    </Page>
  );
}

const styles = {
  width: "100%",
  padding: "10px",
  fontSize: "18px",
  fontweight: "900",
  height: "44px",
  minWidth: "96px",
  border: "2px solid",
  margin: "15px 0px 0px 0px"
}

const inputstyles = {
  width: "100%",
  padding: "",
  // height:"44px",
  minWidth: "96px",
  margin: "15px 0px 15px 0px",
}

const warninginput = {
  width: "100%",
  padding: "",
  // height:"44px",
  minWidth: "96px",
  margin: "0px 0px 0px 0px",
  border: "1px solid rgba(224,30,94,.4)",
  borderRadius: "4px"
}

const Page = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    min-height: 100%
    color:green;
`;

const Main = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    flex-shrink: 0;
    width: 100%;
    align-items: center;
    max-width: 800px;
`;

const Subheader = styled.div`
    font-size: 18px;
    line-height: 27px;
    margin-bottom: 32px;
    color: #454245;
    max-width: 700px;
    text-align: center;
`;

const Signin = styled.div`
width: 400px;
background-color:white;
`;

export default Login;