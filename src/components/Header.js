import React from 'react';
// import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useHistory } from 'react-router';
// import { useHistory } from 'react-router-dom';

// import { getCookie, deleteCookie } from '../shared/Cookie';

const Header = (props) => {
  const history=useHistory();
  const is_register=props.is_register;
  // console.log(props.history);
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
              <a style={{ color:"blue", fontWeight:"bold"}} onClick={()=>{
                console.log('history push to register1');
                history.push('./register');
              }}>계정 생성</a>
              {/* <button onClick={()=>{history.push('./register'); */}
            {/* console.log('history push to register1');}}>asdf</button> */}
            </div>)}
            
          </div>
        </Header1>
    </React.Fragment>
  );
};

Header.defaultProps = {};

// const Logo = styled.a`
//   text-decoration: none;
//   img {
//     width: 15%;
//   }
//   div {
//     background-image: url("https://user-images.githubusercontent.com/91959791/163001319-d6e449d7-8443-4106-8128-902e93a889f4.png");
//     background-size: cover;
//     background-position: center;
//     width: 150px;
//     height: 150px;
//     margin: -20px auto 0;
//     padding: 0 30px 0px 30px;
//     // margin: -20px 0 0 0;
//   }
// `;
const Header1=styled.div`
    padding: 48px 0 40px;
    width: 100%;
    display: flex;
    flex:1
    align-items: center;
    // grid-template-columns: repeat(3,1fr);
    // grid-template-rows(minmax(127px,127px));
    background-color:white;
`;

export default Header;