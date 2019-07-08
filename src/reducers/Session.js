
const INITIAL_STATE = {
  authUser: null,
  userName:'',
  email:'',
  isAdmin:false
};


function sessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default sessionReducer;
