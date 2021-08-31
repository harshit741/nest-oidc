import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  Provider,
  Configuration,
  Account,
  KoaContextWithOIDC,
} from 'oidc-provider';
import * as os from 'os';

const config: Configuration = {
  clients: [
    {
      client_id: 'foo',
      redirect_uris: ['https://jwt.io'],
      response_types: ['id_token'],
      grant_types: ['implicit'],
      token_endpoint_auth_method: 'none',
    },
  ],
  cookies: {
    keys: ['hello', 'world'],
  },
  interactions: {
    url: (ctx: KoaContextWithOIDC, interaction): string => {
      return `/oidc/interaction/${interaction.uid}`;
    },
  },
  findAccount: () => {
    const a: Account = {
      displayName: 'name',
      id: '123',
      rpDisplayName: 'something',
      accountId: 'test',
      claims: () => ({ sub: '1235', email: 'test@test.com' }),
    };
    return a;
  },
  // claims: {
  //   openid: ['sub'],
  //   email: ['email', 'email_verified'],
  // },
  // features: {
  //   // disable the packaged interactions
  //   devInteractions: { enabled: false },
  // },
  // pkce: {
  //   required: true,
  // },
};
@Injectable()
export class AppService implements OnModuleInit {
  oidc: Provider;
  onModuleInit() {
    console.log('hostname', os.hostname());
    this.oidc = new Provider('http://localhost:3000', config);
  }
  getData(): { message: string } {
    return { message: 'SSO running' };
  }
}
