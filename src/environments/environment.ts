import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  firebase: {
    projectId: 'colegiolqn',
    appId: '1:246485818182:web:4c0b8d36fc3a53b4f9e347',
    databaseURL: 'https://colegiolqn-default-rtdb.firebaseio.com',
    storageBucket: 'colegiolqn.appspot.com',
    locationId: 'southamerica-east1',
    apiKey: 'AIzaSyBuRfgEhRGIX3NHFR7uB3HJZtTbJYj1i_k',
    authDomain: 'colegiolqn.firebaseapp.com',
    messagingSenderId: '246485818182',
    measurementId: 'G-3XXL5TF9R1',
  },
};
initializeApp(environment.firebase);