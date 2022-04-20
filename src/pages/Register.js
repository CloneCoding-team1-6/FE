import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Button  from '@material-ui/core/Button';
import { apis } from '../shared/api';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { idCheck}  from '../shared/common';
import {useDispatch } from 'react-redux'; 
import { actionCreators as userActions } from '../redux/modules/user';

// import { ButtonProps } from '@mui/material/Button';
const Register = (props) => {
  const dispatch=useDispatch();
    const [id, setId]= React.useState('');
    const [nickname,setNickname] =React.useState('');
    const [pwd,setPwd]= React.useState('');
    const [pwdcheck, setPwdcheck]=React.useState('');
    const [idcheck,setIdcheck]=React.useState('true');
    const [nicknamecheck,setNicknamecheck]=React.useState('true');
    const [warning,setWarning]=React.useState(false);
    // let warning=false;
    // console.log();
    

    const signup = () =>{
      
        if (id === '' | nickname === '' | pwd === '' | pwdcheck === '') {
          window.alert('아이디, 비밀번호, 닉네임을 모두 입력해주세요!');
          return;
        };
    
        if (!idCheck(id)) {
            console.log(warning);
            window.alert('아이디 형식이 맞지 않습니다!');
            return;
          }
        if (id === '' || pwd === '') {
            window.alert('아이디와 비밀번호를 모두 입력해주세요!');
            return;
          }
          dispatch(userActions.signupFB(id, nickname, pwd, pwdcheck));
        
    };
    const EmailCheck =()=>{
      console.log("email check");
      apis.idcheck(id).then((res)=>{
        console.log('emailcheck2');
        window.alert(res.data);
        //client 메시지 처리 필요
      })
      .catch((error)=>{
        console.log('emailcheck error');
        console.log(error);
      })

    }
    const NicknameCheck =()=>{
      console.log("nickname check");
      apis.nicknamecheck(nickname)
      .then((res)=>{
        console.log('nickname check success');
        window.alert(res.data);
        //client 메시지 처리 필요
      })
      .catch((error)=>{
        console.log('nicknamecheck error');
        console.log(error);
      })
      
    }
    React.useEffect(()=>{
      return()=>{
        // removeEventListener();
      };
        console.log(warning);
    },[warning]);
    
    
  return (
    <Page>
        <Header is_register/>
        <Main>
            <h1 style={{fontSize:"48px", margin:"15px 0px 0px 0px"}}>회원가입 </h1>
            <Subheader>
                {/* <strong>직장에서 사용</strong>로 로그인하는 걸 추천드려요. */}
            </Subheader>
            <Registerbox>
                
                <Checkbox>
                    <TextField label="Email" style={inputstyles} 
                    // ForwardRef={id}
                    onChange={(e) => {
                        setId(e.target.value);
                        console.log(e.target.value);
                      }}
                        // hintText="Password"
                        // floatingLabelText="Password"
                        >
                            
                    </TextField>
                    <Button size='small' variant='contained' style={{maxwidth:'70px',flex:1,justifyContent:'center', margin:"15px 0px 0px 20px",fontSize:"10px"}} onClick={EmailCheck}>
                      중복체크
                    </Button>
                </Checkbox>

                <Checkbox>
                    <TextField label="Nickname" style={inputstyles}
                    // ForwardRef={id}
                    onChange={(e) => {
                      setNickname(e.target.value);
                        console.log(e.target.value);
                      }}
                        // hintText="Password"
                        // floatingLabelText="Password"
                        >
                            
                    </TextField>
                    <Button size='small' variant='contained' style={{maxwidth:'70px',flex:1,justifyContent:'center', margin:"15px 0px 0px 20px",fontSize:"10px"}}  onClick={NicknameCheck}>
                      중복체크
                    </Button>
                </Checkbox>
                <div>
                <TextField label="Password" style={inputstyles}
                // ForwardRef={id}
                onChange={(e) => {
                    setPwd(e.target.value);
                  }}
                    // hintText="Password"
                    // floatingLabelText="Password"
                    type='password'>
                        
                </TextField>
                
                <TextField  label="Password Check" style={inputstyles}
                onChange={(e) => {
                    setPwdcheck(e.target.value);
                    if(pwd===e.target.value)
                    {
                      setWarning(false);
                    }
                    else{
                      setWarning(true);
                    }
                    
                  }}
                    // hintText="Password"
                    // floatingLabelText="Password"
                    type='password'
                    >
                
                </TextField>
                {warning? (<Alert style={{border:"1px solid rgba(224,30,94,.4)",backgroundColor:"rgba(224,30,90,.1)",fontWeight:"bold",margin:"0px 0px 24px 0px"}}severity="warning">비밀번호가 일치하지 않습니다.</Alert>):""}
                
                </div>
                <Button variant='contained' style={{height:"44px",fontWeight:"bold", width:"100%", margin:"24px 0px 0px 0px", fontSize:"18px",color:"white", backgroundColor:"#4a154b"}} onClick={()=>{
                    {
                      signup();
                      console.log('회원가입');
                    }}}>회원가입</Button>

                
            </Registerbox>
        </Main>
    </Page>
  );
                  }

const styles={
    width:"100%",
    padding:"10px",
    fontSize: "18px",
    fontweight: "900",
    height: "44px",
    minWidth: "96px",
    border: "2px solid",
    margin:"15px 0px 0px 0px"
}
const inputstyles={
    width:"100%",
    padding:"",
    // height:"44px",
    minWidth:"96px",
    margin:"15px 0px 0px 0px",

}
const warninginput={

    width:"100%",
    padding:"",
    // height:"44px",
    minWidth:"96px",
    margin:"15px 0px 0px 0px",
    border:"1px solid rgba(224,30,94,.4)",
    borderRadius:"4px"

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
`
const Registerbox = styled.div`
width: 400px;
background-color:white;
`;


const Checkbox=styled.div`
  display:flex;

`;

export default Register;