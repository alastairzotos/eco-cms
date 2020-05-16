/* tslint:disable:ordered-imports */
import 'module-alias/register';
import { startApp } from '~/core/app';
import {
    authModule,
    adminModule
} from '~/modules';

process.stdout.write('\x1Bc');

/*
Mailtrap for dev -> https://mailtrap.io/
SendGrid for prod
*/

startApp([
    authModule,
    adminModule
]).catch(e => console.log(e));
