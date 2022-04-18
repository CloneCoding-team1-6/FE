import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import thunk from "redux-thunk";

import Axios from "../../shared/request";
import { RESP } from "../../shared/response";




// 액션 
const GET_ALL_USER = "GET_ALL_USER";

// 초기값
const initialState = {
    list: [

    ],
}

// 액션 생성
const getAllUser = createAction(GET_ALL_USER, (user_list) => ({ user_list }));



// 미들웨어
const getAllUserDB = () => {
    return async function (dispatch, getState, { history }) {

        // Axios
        // .get('/api/users') 
        // .then((response) => {
        //     console.log("getAllUserDB : response", response);
        //     dispatch(getAllUser(response));
        // }).catch((error) => {
        //     console.log("getAllUserDB : error", error.response);
        // })
        
        const response = RESP.GET_ALL_USER;
        console.log(response);
        dispatch(getAllUser(response));
    }
}



export default handleActions(
    {
        [GET_ALL_USER]: (state, action) => produce(state, (draft) => {
            console.log("GET_ALL_USER : user_list", action.payload.user_list)
            draft.list = action.payload.user_list;
        }),

    },
    initialState
)



const userActions = {
    getAllUser,
    getAllUserDB
}

export { userActions };