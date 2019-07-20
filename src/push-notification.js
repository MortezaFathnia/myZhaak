import firebase from 'firebase';

export const initializeFirebase = () => {
  var firebaseConfig = {
    apiKey: 'AIzaSyCO0POv68FmCPNhexLnSpGg0wDx40zZqA0',
    authDomain: 'zhaak-4ad4e.firebaseapp.com',
    databaseURL: 'https://zhaak-4ad4e.firebaseio.com',
    projectId: 'zhaak-4ad4e',
    storageBucket: 'zhaak-4ad4e.appspot.com',
    messagingSenderId: '242627529388',
    appId: '1:242627529388:web:ce695ee1d62716ea'
  };
  firebase.initializeApp(firebaseConfig);

  navigator.serviceWorker
    .register('../public/firebase-messaging-sw.js')
    .then(async registration => {
      firebase.messaging().useServiceWorker(registration);
      const token = await firebase.messaging.getToken();
      console.log('token serviceWorker:', token);
    });
};

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token:', token);

    return token;
  } catch (error) {
    console.error(error);
  }
};
