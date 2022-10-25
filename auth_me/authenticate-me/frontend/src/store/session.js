import { csrfFetch } from './csrf'

const ADD_USER = 'user/ADD_USER';
export const addUser = (user) => {
    return ({
        type: ADD_USER,
        user
    })
};


const REMOVE_USER = 'user/REMOVE_USER';
export const removeUser = (userID) => {
    return ({
        type: REMOVE_USER,
        userID
    })
};

export const loginUser = user => async dispatch => {
    let response = await csrfFetch('/api/session', {
        method: "POST",
        body: JSON.stringify(user)
    })

    let data = await response.json()
    dispatch(addUser(data.user))

} 

export const sessionReducer = (state={},action) => {
    switch(action.type){
        case ADD_USER:
            
            return {...state, currentUser: action.user.id}

            
        default:
            return state
    }
}