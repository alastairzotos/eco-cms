import cookies from 'cookiesjs';
import { from, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { config } from './config';
import history from './history';

export interface IRequest {
    url: string;
    method: 'GET' | 'POST';
    contentType?: 'application/json' | 'multipart/form-data';
    body?: any;
    query?: object;
}

export interface IResponse<T> {
    status: number;
    body?: T;
    error?: any;
}

export type ICallStatus = 'fetching' | 'success' | 'error';

const createQueryString = (query: object): string =>
    Object.keys(query).map(key => `${key}=${query[key]}`).join('&');

const parseBody = async (response: any) => {
    let parsed = null;
    try {
        parsed = await response.json();
    } catch (e) {
        try {
            parsed = await response.text();
        } catch (e) {
            parsed = null;
        }
    }

    return parsed;
};

const performFetch = <T = any>(req: IRequest): Promise<IResponse<T>> =>
    new Promise(async (resolve, reject) => {
        try {
            if (req.query) {
                req.url += '?' + createQueryString(req.query);
            }

            const authHeaders: any = {};
            const token = cookies('ecotoken');
            if (token) {
                authHeaders.Authorization = `Bearer ${token}`;
            }

            const domain = config.domain;
            const apiRoute = '/api';

            const contentHeaders = {
                Accept: 'application/json'
            };

            if (req.contentType !== 'multipart/form-data') {
                contentHeaders['Content-Type'] = req.contentType || 'application/json';
            }

            let body;
            if (req.body) {
                if (req.contentType === 'multipart/form-data') {
                    body = req.body;
                } else {
                    body = JSON.stringify(req.body);
                }
            }

            const response = await window.fetch(domain + apiRoute + req.url, {
                method: req.method,
                headers: {
                    ...contentHeaders,
                    ...authHeaders
                },
                body
            });

            const responseObject: IResponse<T> = {
                status: response.status,
                body: await parseBody(response)
            };

            if (!response.ok) {
                throw responseObject;
            }

            resolve(responseObject);

        } catch (e) {
            reject(e);
        }
    });

export const fetch$ = <T = any>(req: IRequest) =>
    from(performFetch<T>(req)).pipe(
        switchMap(res => of(res)),
        catchError(e => {
            if (e.status === 401 || e.status === 403) {
                history.push(`/login?fwd=${encodeURIComponent(history.location.pathname)}`);
            }

            return throwError(e);
        })
    );
