import React, { useState } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";
import { ChatRoomList, ChatRoomBox, ChatHeader } from "../components";
import { Grid2 } from "../elements";


const Chat = () => {

const [chatRoomOpen, setChatRoomOpen] = useState(false);
const params = useParams();
console.log("CHAT : PARAMS", params);


    return (
        <React.Fragment>
            <Box>
                <Grid2 bg="#fff" height="100vh">
                    <ChatHeader />
                    <Grid2 is_flex>
                        <Grid2 width="260">
                            <ChatRoomList />
                        </Grid2>
                        <ChatRoomBox />
                    </Grid2>
                </Grid2>
            </Box>
        </React.Fragment>
    );
};


const Box = styled.div`
    overflow: hidden;  
    background: #3F0E40;
`



export default Chat;