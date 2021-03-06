// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mapbox: {
    accessToken: 'pk.eyJ1IjoiZGFnc3NvbiIsImEiOiJjajk0MTRqdWIzZGxwMzNycGtreDhxMmRxIn0.0zk_7FSvF_LlQ0AD2cChWQ'
  },
  firebase: {
    apiKey: 'AIzaSyAEddonfjKY3IhGNCfJrpYsuhSpLEw-T2w',
    authDomain: 'matur-cc9b3.firebaseapp.com',
    databaseURL: 'https://matur-cc9b3.firebaseio.com',
    storageBucket: 'matur-cc9b3.appspot.com',
    messagingSenderId: '415086235609'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
