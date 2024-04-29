import { UPDATE_PROFILE_SUCCESS } from '../actionTypes';

const initialState = {
  profile: {
    updating: false,
    error: null,
  },
  // ... other reducers and state properties
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          updating: false,
          error: null,
        },
      };
    default:
      return state;
  }
};

export default profileReducer;
