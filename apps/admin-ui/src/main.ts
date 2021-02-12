import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Amplify, { API } from 'aws-amplify';

const auth = {
  aws_project_region: environment.auth.region,
  aws_cognito_identity_pool_id: environment.auth.identityPoolId, // 'eu-central-1:75a6c653-26fd-48e1-9f17-274db2ca4ae8',
  aws_cognito_region: environment.auth.region,
  aws_user_pools_id: environment.auth.userPoolId, // 'eu-central-1_Gr9WPsz3i',
  aws_user_pools_web_client_id: environment.auth.clientId, // '4qddbhldc4os0sn5t7p4liv2b3',
  federationTarget: 'COGNITO_USER_POOLS',
};

Amplify.configure(auth);

const api = {
  endpoints: [
    {
      name: 'admin_service',
      endpoint: environment.apiBase,
    },
  ],
};

API.configure(api);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
