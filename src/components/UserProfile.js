import React, { useEffect } from "react";
import styled from "styled-components";
import { Image } from "../elements";
import Button from '@material-ui/core/Button';
import {HiDotsHorizontal} from "react-icons/hi";
import {BsEmojiSmile, BsPencil} from "react-icons/bs"
import { apis } from "../shared/api";
const UserProfile = () => {
    const [id,setId]=React.useState('example@example');
    const [imagesrc,setImagesrc]=React.useState('');
    const [nickname,setNickname]=React.useState('example');
    React.useEffect(()=>{
        apis.islogin()
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        })

        return()=>{
          // removeEventListener();
        };
          console.log('api test');
      },[]);
      
    

    return (
        <React.Fragment>
            <ProfilePage>
                {/* <h1 style={{margin:'0px'}}>프로필</h1> */}
                <div sytle={{height:'256px'}}>
                    <Image shape='rectangle' size='256' />
                </div>
                <div>
                    <div style={{textAlign:'center', fontSize:'18px'}}>
                        <strong>{nickname}</strong>
                    </div>
                    <Button color="primary" style={{ fontSize:'15px'}}>
                        제목추가
                    </Button>
                </div>
                <div style={{display:'flex',flexDirection:'row'}} >
                    <Button component="span" style={{display: 'flex',flexDirection:'column', alignItems:'center'}}>
                        <div  style={{display: 'flex',flexDirection:'column', alignItems:'center'}}>    
                            <BsEmojiSmile style={{flexGrow:1,borderRadius:'30px',width:'25px',height:'25px'}}/>
                            <p style={{flexGrow:1}}>상태 설정</p>
                        </div>
                    </Button>
                    <input  accept="image/*"  style={{ display: 'none' }}  id="raised-button-file"  multiple  type="file"/>
                    <label htmlFor="raised-button-file" >
                        <Button component='span' style={{ width:'100px'}} >
                            <div  style={{display: 'flex',flexDirection:'column', alignItems:'center'}}>
                                <BsPencil style={{flexGrow:1,width:'25px',height:'25px'}}/>
                                <p style={{flexGrow:1}}>사진교체</p>
                            </div>
                            
                        </Button>
                    </label>
                    
                    <Button component="span" style={{display: 'flex',flexDirection:'column', alignItems:'center'}}>
                        <div  style={{display: 'flex',flexDirection:'column', alignItems:'center'}}>
                            <HiDotsHorizontal style={{flexGrow:1,borderRadius:'30px',width:'25px',height:'25px'}}/>
                            <p style={{flexGrow:1}}>더보기</p>
                        </div>
                    </Button>
                
                </div>
                <div style={{marginTop:'16px',display:'flex', flexDirection:'column', alignItems:'left' ,width:"100%"}}>
                    <div style={{position:'relative', display:'flex', padding:'8px 16px'}}>
                        <div style={{flex:1, minWidth:0}}>
                            <div style={{fontSize:'13px', lineHeight:'1.38463',fontWeight:'700'}}>
                                표시이름
                            </div>
                            <div>
                                {nickname}
                            </div>
                        </div>
                        
                    </div>
                    <div style={{position:'relative', display:'flex', padding:'8px 16px'}}>
                        <div style={{flex:1, minWidth:0}}>
                            <div style={{fontSize:'13px', lineHeight:'1.38463',fontWeight:'700'}}>
                                현재시간
                            </div>
                            <div>
                                examplename
                            </div>
                        </div>
                        
                    </div>
                    <div style={{position:'relative', display:'flex', padding:'8px 16px'}}>
                        <div style={{flex:1, minWidth:0}}>
                            <div style={{fontSize:'13px', lineHeight:'1.38463',fontWeight:'700'}}>
                                전화번호
                            </div>
                            <div style={{color:'blue'}}>
                                010-0000-0000
                            </div>
                        </div>
                        
                    </div>
                    <div style={{position:'relative', display:'flex', padding:'8px 16px'}}>
                        <div style={{flex:1, minWidth:0}}>
                            <div style={{fontSize:'13px', lineHeight:'1.38463',fontWeight:'700'}}>
                                이메일주소
                            </div>
                            <div style={{color:'blue'}}>
                                {id}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </ProfilePage>
        </React.Fragment>
    );
}


export default UserProfile;

const ProfilePage = styled.div`
    width:400px;
    height: 675px;    
    display: flex;
    flex-direction: column;
    align-items: center;

`;
const Input = styled('input')({
    display: 'none',
  });
