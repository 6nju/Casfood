import { ActionTypes } from './ActionTypes'

const initialState = {
    user_login: null,
}

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ActionTypes.SET_USER_LOGIN: {
            return {
                ...state,
                user_login: payload,
            }
        }
		case ActionTypes.SET_STEP_FOUR: {
            return {
                ...state,
                step_four: payload,
            }
        }
    }

    return state
}