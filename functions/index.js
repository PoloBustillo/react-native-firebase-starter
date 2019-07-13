const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// On sign up.
exports.processSignUp = functions.auth.user().onCreate(event => {
  const user = event;
  // The Firebase user.
  // Check if user meets role criteria.
  if (user.email &&
      (user.email === 'leopoldobeguiluz1@hotmail.com'
      || user.email === 'admin@tortillerias.com')) {
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


//Now we're going to create a function that listens to when a 'Notifications' node changes and send a notificcation
//to all devices subscribed to a topic
exports.sendNotification = functions.firestore
    .document('notificaciones/{id}').onCreate((change, context) => {
    //This will be the notification model that we push to firebase
    var request = change.data();
    console.log(request);
    console.log(context);

    /*{
      "message":{
        "token":"bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1...",
        "notification":{
          "title":"Portugal vs. Denmark",
          "body":"great match!"
        },
        "data" : {
          "Nick" : "Mario",
          "Room" : "PortugalVSDenmark"
        },
        "android":{
          "ttl":"4500s"
        }
      }
    }*/
    var payload = {
      message:{
        topic: request.topic,
        notification:{
          title: request.body,
          body: request.username+' creo un nuevo reporte'
        },
        data:{
          username: request.username,
          fecha: request.fecha.toString()
        },
        android:{
          ttl:28800000
        }
      }
    };

    //The topic variable can be anything from a username, to a uid
    //I find this approach much better than using the refresh token
    //as you can subscribe to someone's phone number, username, or some other unique identifier
    //to communicate between

    //Now let's move onto the code, but before that, let's push this to firebase

    admin.messaging().send(payload.message)
    .then((response) => {
        console.log("Successfully sent message: ", response);
        return true;
    })
    .catch((error) => {
        console.log("Error sending message: ", error);
        return false;
    })
})
