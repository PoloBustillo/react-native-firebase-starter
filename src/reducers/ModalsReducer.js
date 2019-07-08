
const INITIAL_STATE = {
  openRegister: false,
  openLogin: false,
  errorCode:'',
  spinner:false,
  openEmailVerification:false
};

function modalsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}


export default modalsReducer;
