import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';


const Header = (props) => {

  const history=useHistory();
  const is_register=props.is_register;
  
  return (
    <React.Fragment>
        <Header1>
          <div style={{flex:1, height:"50px", alignItems:'center', backgroundColor:'white'}}></div>
          <div style={{flex:1, display:"flex" ,alignItems:'center',justifyContent: "center", backgroundColor:'whtie'}}>
          <img style ={{alignItems:"center"}} src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg" height="34"/>
          </div>
          <div style={{flex:1, display:'flex', justifyContent:'flex-end', alignItems:'center', backgroundColor:'white'}}>
          {is_register?(""):(<div style={{textAlign:'right', fontSize:'13px',    color: (97,96,97), paddingRight:"40px"}}>
              Slack을 처음 사용하시나요?
              <br/>
              <CreateId style={{ color:"blue", fontWeight:"bold"}} onClick={()=>{
                history.push('./register');
              }}>계정 생성</CreateId>
            </div>)}
          </div>
        </Header1>
    </React.Fragment>
  );
};



Header.defaultProps = {};

const Header1=styled.div`
    padding: 48px 0 40px;
    width: 100%;
    display: flex;
    flex:1;
    align-items: center;
    background-color:white;
`;
const CreateId=styled.a`
&:hover {
  cursor:pointer;
`;

export default Header;