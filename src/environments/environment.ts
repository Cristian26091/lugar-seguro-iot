// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  firebase: {
    databaseURL: 'https://lugar-seguro-iot-default-rtdb.firebaseio.com',
    projectId: 'iot-hogar-seguro',
    appId: '1:658437446244:web:54ea9f76f4afb9ec675d71',
    storageBucket: 'iot-hogar-seguro.appspot.com',
    apiKey: 'AIzaSyDjWJBuDb0g-x-nXYaIBzESjTKzt0PIlyo',
    authDomain: 'iot-hogar-seguro.firebaseapp.com',
    messagingSenderId: '658437446244',
    measurementId: 'G-EHVDFT58RK',
  },
  production: false
};
