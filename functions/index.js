const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// On sign up.
exports.processSignUp = functions.auth.user().onCreate(event => {
  const user = event;
  // The Firebase user.
  // Check if user meets role criteria.
  if (user.email &&
      user.email === 'leopoldobeguiluz1@hotmail.com') {
    console.log('same email');
    const customClaims = {
      admin: true,
      accessLevel: 9
    };
    // Set custom user claims on this newly created user.
    return admin.auth().setCustomUserClaims(user.uid, customClaims)
      .then(() => {
        console.log('Success');
        return {
          message: 'Success! ${data.email} is admin'
        }
      })
      .catch(error => {
        return err;
      });
  }
});
