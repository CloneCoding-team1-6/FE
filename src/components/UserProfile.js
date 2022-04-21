import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import moment from "moment";

import { apis } from "../shared/api";
import { actionCreators as userActions } from "../redux/modules/User";


import { Image } from "../elements";
import Button from '@material-ui/core/Button';
import {HiDotsHorizontal} from "react-icons/hi";
import {BsEmojiSmile, BsPencil} from "react-icons/bs"
import { FiX } from "react-icons/fi";
import { ChatActions } from "../redux/modules/Chat";
import { useParams } from "react-router-dom";



const UserProfile = (props) => {

    const dispatch = useDispatch();
    const {setIsOpen} = props;
    const roomId = useParams();

    const nowTime=moment().format('HH:MM');
    const date=nowTime.split(':')[0]>12?'오후':'오전';
    const [id,setId]=React.useState('example@example');
    const [imagesrc,setImagesrc]=React.useState(null);
    const [nickname,setNickname]=React.useState('example');
    const [curdate,setCurdate]=React.useState(`${date} ${nowTime}`);
    const fileInput = React.useRef();
    
    // 로그인 체크
    React.useEffect(()=>{
        apis.islogin()
        .then((res)=>{
            setId(res.data['username']);
            setNickname(res.data['nickname']);
            setImagesrc(res.data['imgUrl']);
        })
        .catch((error)=>{
            console.log(error);
        })
    }, []);
    
    // 이미지 업로드
    const handleimage=(e)=>{
        const file = fileInput.current.files[0];
        const formData = new FormData();
        formData.append('file',file);

        apis
        .editimage(formData)
        .then((res)=>{
            console.log("UserProfile : handleimage", res);
            setImagesrc(res.data);
            dispatch(ChatActions.getMessageDB(roomId.roomid));
            dispatch(userActions.loginCheckFB());
        })
        .catch((error)=>{
            console.log(error.response);
        })
    }
    

    return (
        <React.Fragment>
            <ProfilePage>
                <FiX className="icon" onClick={() => {
                    setIsOpen(false)
                }} />
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

const ProfilePage = styled.div`
    width:400px;
    height: 675px;    
    display: flex;
    flex-direction: column;
    align-items: center;

`;


export default UserProfile;

