/* tslint:disable:ordered-imports */
import 'module-alias/register';
import { start } from '~/core/app';

import { testModule } from './testmodule';

process.stdout.write('\x1Bc');

/*
Mailtrap for dev -> https://mailtrap.io/
SendGrid for prod
*/

start([
    testModule
], e => {
    console.log(e);
});
