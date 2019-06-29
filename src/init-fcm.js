import * as firebase from 'firebase/app';
import 'firebase/messaging';

const initializedFirebaseApp = firebase.initializeApp({
  messagingSenderId: '1062881024656'
});

const messaging = initializedFirebaseApp.messaging();

messaging.usePublicVapidKey('1:242627529388:web:ce695ee1d62716ea');

export { messaging };
