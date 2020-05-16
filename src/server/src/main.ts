/* tslint:disable:ordered-imports */
import 'module-alias/register';
import { startApp } from '~/core/app';
import authModule from '~/modules/auth';

console.clear();

/*
Mailtrap for dev -> https://mailtrap.io/
SendGrid for prod
*/

startApp([
    authModule
]).catch(e => console.log(e));
