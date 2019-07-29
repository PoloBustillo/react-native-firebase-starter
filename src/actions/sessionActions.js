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


export const getReportes =  (id)=> {
  return async dispatch => {
    this.ref = firebase.firestore().collection('tortillerias').doc(id).collection('reportes');

    this.observer = this.ref.onSnapshot(docSnapshot => {
      let arrayData = [];
      docSnapshot.forEach(function(element) {
        arrayData.push({...element.data(),key:element.id});
      });
      dispatch(getReportesSuccess(arrayData))
    }, err => {
      dispatch(getReportesFail())
    });

    this.ref = firebase.firestore().collection('settings').doc('report')
    this.observer = this.ref.onSnapshot(docSnapshot => {
      let costoMasa = docSnapshot.data().costoMasa;
      console.warn(docSnapshot.data());
      dispatch(getSettingsSuccess(costoMasa))
    }, err => {
      dispatch(getReportesFail())
    });
  }
}

getSettingsSuccess = (costoMasa) => ({
  type: ActionTypes.LOAD_SETTINGS_SUCCESS,
  costoMasa: costoMasa
});

getReportesSuccess = (reportes) => ({
  type: ActionTypes.LOAD_REPORTES_SUCCESS,
  reportes: reportes
});


getReportesFail = () => ({
  type: ActionTypes.LOAD_REPORTES_FAIL
});
