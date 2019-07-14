import * as ActionTypes from './types';
import firebase from 'react-native-firebase';


export const loginUser =  ()=> {
  return async dispatch => {
    firebase.auth().onAuthStateChanged(async (user) =>{
      if(user){
          let isAdmin = await user.getIdTokenResult(true)
          .then((idTokenResult) => {
            return Promise.resolve(idTokenResult.claims.admin);
          })
          dispatch(loginUserSuccess(user,isAdmin));
        }
      else{
        dispatch(loginUserFail())
      }
      });

    }
}

loginUserSuccess = (authUser,isAdmin) => ({
  type: ActionTypes.LOGIN_USER_SUCCESS,
  payload: authUser,
  isAdmin: isAdmin
});


loginUserFail = () => ({
  type: ActionTypes.LOGIN_USER_FAIL
});

export const getTortillerias =  ()=> {
  return async dispatch => {
    this.ref = firebase.firestore().collection('tortillerias');
    this.observer = this.ref.onSnapshot(docSnapshot => {
      let arrayData = [];
      docSnapshot.forEach(function(element) {
        arrayData.push({...element.data(),key:element.id});
      });
      dispatch(getTortilleriasSuccess(arrayData))
    }, err => {
      dispatch(getTortilleriasFail())
    });
  }
}

getTortilleriasSuccess = (tortillerias) => ({
  type: ActionTypes.LOAD_TORTILLERIAS_SUCCESS,
  tortillerias: tortillerias
});


getTortilleriasFail = () => ({
  type: ActionTypes.LOAD_TORTILLERIAS_FAIL
});

export const deleteTortilleria = (id)=> {
  return async dispatch => {
    this.ref = firebase.firestore()
      .collection('tortillerias').doc(id).delete();
    dispatch(deleteTortilleriasSuccess());
  }
}

deleteTortilleriasSuccess = () => ({
  type: ActionTypes.DELETE_TORTILLERIA_SUCCESS
});
