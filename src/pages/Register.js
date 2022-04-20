import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/User';

import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

import { apis } from '../shared/api';
import { idCheck } from '../shared/common';

import Header from '../components/Header';

const Register = (props) => {

  const dispatch = useDispatch();
  const [id, setId] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [pwdcheck, setPwdcheck] = React.useState('');
  const [idcheck, setIdcheck] = React.useState('true');
  const [nicknamecheck, setNicknamecheck] = React.useState('true');
  const [warning, setWarning] = React.useState(false);
  const [oknickname, setokNickname] = React.useState('false');
  const [okid, setOkid] = React.useState('false');

  const signup = () => {

    if (id === '' | nickname === '' | pwd === '' | pwdcheck === '') {
      window.alert('아이디, 비밀번호, 닉네임을 모두 입력해주세요!');
      return;
    };

    if (!idCheck(id)) {
      // console.log(warning);
      window.alert('아이디 형식이 맞지 않습니다!');
      return;
    }

    const user_data = {
      username: id,
      nickName: nickname,
      password: pwd,
      passwordCheck: pwdcheck,
    }
    
    dispatch(userActions.signupFB(user_data));

  };
  const EmailCheck = () => {
    apis.idcheck(id)
    .then((res) => {
      window.alert(res.data);
      res.data === '사용가능한 아이디 입니다.' ? setOkid(true) : setOkid(false);
    }).catch((error) => {
        console.log('EmailCheck : error', error);
      })

  }
  const NicknameCheck = () => {
    console.log("nickname check");
    apis.nicknamecheck(nickname)
      .then((res) => {
        res.data === '사용가능한 닉네임 입니다.' ? setokNickname(true) : setokNickname(false);
        window.alert(res.data);
      })
      .catch((error) => {
        console.log('nicknamecheck error');
        console.log(error);
      })

  }
  return (
    <Page>
      <Header is_register />
      <Main>
        <h1 style={{ fontSize: "48px", margin: "15px 0px 0px 0px" }}>회원가입 </h1>
        <Subheader>
        </Subheader>
        <Registerbox>

          <Checkbox>
            <TextField label="Email" style={inputstyles}
              onChange={(e) => {
                setId(e.target.value);
              }}
            >

            </TextField>
            <Button 
              size='small' 
              variant='contained' 
              style={{ maxwidth: '70px', flex: 1, justifyContent: 'center', margin: "15px 0px 0px 20px", fontSize: "10px" }} 
              onClick={EmailCheck}>
              중복체크
            </Button>
          </Checkbox>

          <Checkbox>
            <TextField label="Nickname" style={inputstyles}
              onChange={(e) => { setNickname(e.target.value); }} />
            <Button 
              size='small' 
              variant='contained' 
              style={{ maxwidth: '70px', flex: 1, justifyContent: 'center', margin: "15px 0px 0px 20px", fontSize: "10px" }} 
              onClick={NicknameCheck}>
              중복체크
            </Button>
          </Checkbox>
          <div>
            <TextField 
              label="Password" 
              style={inputstyles}
              onChange={(e) => {setPwd(e.target.value);}}
              type='password' />

            <TextField 
              label="Password Check" 
              style={inputstyles}
              onChange={(e) => {setPwdcheck(e.target.value);
                if (pwd === e.target.value) {
                  setWarning(false);
                } else {
                  setWarning(true);
                }}}
              type='password' />
            {warning ? (<Alert 
                        style={{ border: "1px solid rgba(224,30,94,.4)", backgroundColor: "rgba(224,30,90,.1)", fontWeight: "bold", margin: "0px 0px 24px 0px" }} 
                        severity="warning">비밀번호가 일치하지 않습니다.</Alert>) : ""}
          </div>
          {okid === true && oknickname === true ? (<Button 
          variant='contained' 
          style={{ height: "44px", fontWeight: "bold", width: "100%", margin: "24px 0px 0px 0px", fontSize: "18px", color: "white", backgroundColor: "#4a154b" }} 
          onClick={() => {signup();}}>회원가입</Button>) : (
            <Button 
              disabled 
              variant='contained' 
              style={{ height: "44px", fontWeight: "bold", width: "100%", margin: "24px 0px 0px 0px", fontSize: "18px", color: "grey", backgroundColor: 'rgb(74, 21, 75,.5)', color: "#fff" }} >중복 확인을 해주세요</Button>)}
        </Registerbox>
      </Main>
    </Page>
  );
}



const inputstyles = {
  width: "100%",
  padding: "",
  minWidth: "96px",
  margin: "15px 0px 0px 0px",
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

const Registerbox = styled.div`
width: 400px;
background-color:white;
`;

const Checkbox = styled.div`
display:flex;
`;

export default Register;