import * as ActionTypes from './types';
import firebase from 'react-native-firebase';

export const loadProducts =  ()=> {
  return async dispatch => {
    this.ref = firebase.firestore().collection('settings').doc('productos');
    this.observer = await this.ref.onSnapshot(docSnapshot => {
      dispatch(loadProductsSucces(docSnapshot.data().lista));
    }, err => {
      dispatch(loadProductsFail());
    });

    }
}

const loadProductsSucces = (productos) => ({
  type: ActionTypes.LOAD_PRODUCTS_SUCCESS,
  productos:productos
});


const loadProductsFail = () => ({
  type: ActionTypes.CREATE_NEW_USER_EMAIL_FAILURE
});
