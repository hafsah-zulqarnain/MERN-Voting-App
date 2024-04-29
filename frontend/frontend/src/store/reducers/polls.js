import { SET_POLLS, SET_CURRENT_POLL, UPDATE_USER_SUCCESS} from '../actionTypes';

export const polls = (state = [], action) => {
  switch (action.type) {
    case SET_POLLS:
      return action.polls;

    default:
      return state;
  }
};

export const currentPoll = (state = [], action) => {
  switch (action.type) {
    case SET_CURRENT_POLL:
      return action.poll;

    default:
      return state;
  }
};

// New reducer for updating user status
export const updateUserStatus = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_SUCCESS:
      return { ...state, updateSuccess: true, updateError: null };
    default:
      return state;
  }
};


