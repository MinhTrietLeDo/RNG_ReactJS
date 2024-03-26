import { GET_RNG } from './../action/actionTypes'

const initialState = {
    masotrungthuong: []
};

const masotrungthuongReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RNG:
            return {
                ...state,
                masotrungthuong: action.payload.masotrungthuong,
            }
            break;
        default: return state;
    }
};


export default masotrungthuongReducer;