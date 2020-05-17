import { Dictionary } from '@reduxjs/toolkit';

import { Renderer } from './renderer';

export enum NodeType {
    None,
    HTMLElement,
    HTMLText,
    Literal
}

export class ParseNode {
    constructor(public nodeType: NodeType) {}

    evaluate = (renderer: Renderer): any => null;
}

export class HTMLNode extends ParseNode {
    constructor(public tagName: string) {
        super(NodeType.HTMLElement);
    }

    childNodes: Array<HTMLNode | HTMLTextNode> = [];
    attributes: Dictionary<ParseNode> = {};
    isSelfClosing: boolean;

    evaluate = (renderer: Renderer) => renderer.renderNode(this);

    evaluateAttributes = (renderer: Renderer, key?: any) =>
        Object.keys(this.attributes).reduce((cur, attr) => ({
            ...cur,
            [attr]: this.attributes[attr].evaluate(renderer)
        }), { key })

    evaluateChildren = (renderer: Renderer) =>
        this.childNodes.map(child => child.evaluate(renderer))
}

export class HTMLTextNode extends ParseNode {
    constructor(public text: string) {
        super(NodeType.HTMLText);
    }

    evaluate = () => this.text;
}

export class LiteralNode extends ParseNode {
    constructor(public value: any) {
        super(NodeType.Literal);
    }

    evaluate = () => this.value;
}
