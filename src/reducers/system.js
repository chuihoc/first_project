import Cookie from 'js-cookie';
import { PENDING, SUCCESS, ERROR, FETCHING_DATA, SIGN_OUT, UPDATE_ROLES, UPDATE_USER_INFO } from '../utils/constants/actionType';
import { Constants, Roles } from '../utils/constants'

const initialState = {
  isLoading: false,
  locale: "en",
  role: Cookie.get(Constants.USER_ROLES) || Roles.ROLE_USER,
  userInfor: {}
};

const system = (state = initialState, action) => {
  switch(action.type) {
    case FETCHING_DATA + PENDING:
      return {
        ...state,
        isLoading: true
      }
    case FETCHING_DATA + SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case FETCHING_DATA + ERROR:
      return {
        ...initialState
      }
    case UPDATE_ROLES:
      return {
        ...state,
        role: action.payload
      }
    case UPDATE_USER_INFO:
      return {
        ...state,
        userInfor: action.payload
      }
    case SIGN_OUT:
      return {
        ...initialState,
        isLoading: false
      }
    default:
      return state
  }
}

export default system