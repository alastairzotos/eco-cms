import { Dictionary } from 'lodash';

export class HtmlElement {
    constructor(
        public tagName: string,
        public attributes: Dictionary<any>,
        public children: any[]
    ) {
        // tslint:disable-line
    }
}
