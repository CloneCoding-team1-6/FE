import React, { useEffect } from "react";
import styled from "styled-components";
import { Image } from "../elements";
import Button from '@material-ui/core/Button';
import {HiDotsHorizontal} from "react-icons/hi";
import {BsEmojiSmile, BsPencil} from "react-icons/bs"
import { apis } from "../shared/api";
import moment from "moment";
const UserProfile = () => {
    const nowTime=moment().format('HH:MM');
    const date=nowTime.split(':')[0]>12?'오후':'오전';
    const [id,setId]=React.useState('example@example');
    const [imagesrc,setImagesrc]=React.useState(null);
    const [nickname,setNickname]=React.useState('example');
    const [curdate,setCurdate]=React.useState(`${date} ${nowTime}`);
    const fileInput = React.useRef();
    
    React.useEffect(()=>{
        apis.islogin()
        .then((res)=>{
            console.log(res.data);
            setId(res.data['username']);
            setNickname(res.data['nickname']);
            setImagesrc(res.data['imgUrl']);
            // console.log(imagesrc);
        })
        .catch((error)=>{
            console.log(error);
        })
        
        return () => {
            // removeEventListener();
        };
        console.log('api test');
    }, []);
    
    const handleimage=(e)=>{
        console.log("작성처음으로 넘어오겠지요");
        const reader = new FileReader();
        const file = fileInput.current.files[0];
        // console.log(reader.readAsDataURL(file));
        console.log(file);
        const formData = new FormData();
        console.log(formData);
        formData.append('file',file);
        console.log(formData);
        apis.editimage(formData)
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            setImagesrc(res.data);

        })
        .catch((error)=>{
            console.log(error);

        })

    }
    

    return (
        <React.Fragment>
            <ProfilePage>
                {/* <h1 style={{margin:'0px'}}>프로필</h1> */}
                <div sytle={{height:'256px'}}>
                    <Image shape='rectangle' src={imagesrc?imagesrc:  "https://user-images.githubusercontent.com/91959791/162676899-be6a11b1-d103-4d57-89b8-34db876fad6f.png"} size='256' />
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
                    <input  onChange={handleimage} accept="image/*"  style={{ display: 'none' }}  id="raised-button-file"  multiple type="file" ref={fileInput}/>
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
                                {curdate}
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
