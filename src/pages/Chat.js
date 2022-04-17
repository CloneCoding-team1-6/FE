import React, { useState } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";
import { ChatRoomList, ChatRoomBox, Header } from "../components";
import { Grid } from "../elements";


const Chat = () => {



    return (
        <React.Fragment>
            <Box>
                <Grid bg="#3f0e40" height="100vh">
                    <Header />
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