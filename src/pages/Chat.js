import React from "react";
import styled from "styled-components";

import { ChatRoomList, ChatRoomBox, ChatHeader } from "../components";

import { Grid2 } from "../elements";


const Chat = () => {


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