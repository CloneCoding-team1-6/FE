import React, { useState } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";
import { ChatRoomList, ChatRoomBox, ChatHeader } from "../components";
import { Grid } from "../elements";


const Chat = () => {

const [chatRoomOpen, setChatRoomOpen] = useState(false);
const params = useParams();
console.log("CHAT : PARAMS", params);


    return (
        <React.Fragment>
            <Box>
                <Grid bg="#fff" height="100vh">
                    <ChatHeader />
                    <Grid is_flex>
                        <Grid width="260">
                            <ChatRoomList />
                        </Grid>
                        <ChatRoomBox />
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
};


const Box = styled.div`
    overflow: hidden;  
    background: #3F0E40;
`



export default Chat;