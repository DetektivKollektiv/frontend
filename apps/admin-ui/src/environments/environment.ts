// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  stage: 'dev',
  apiBase: 'https://api.dev.codetekt.org/admin_service',
  auth: {
    identityPoolId: 'eu-central-1:69722fe9-a444-4aa5-8016-129a273b2fa5',
    region: 'eu-central-1',
    userPoolId: 'eu-central-1_edLkAIQVL',
    clientId: '5hve4k55kh15k3eitap91h966r',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
