import { Dictionary } from 'lodash';
import * as React from 'react';
import { isArray } from 'util';

import { HtmlElement } from './html';
import { HTMLNode, ParseNode } from './nodes';
import { Parser } from './parser';

export class Runtime {
    constructor(
        public customNodes: Dictionary<any>,
        scope: Dictionary<any>
    ) {
        this.scope = [scope];
    }

    private elemCount: number = 0;
    private scope: Array<Dictionary<any>> = [];

    run = (input: string): any[] => {
        this.elemCount = 0;
        return this.renderChildren(
            this.parse(input)
            .map(node => node.evaluate(this))
        );
    }

    pushScope = (values: Dictionary<any>) => this.scope.push(values || {});
    popScope = () => this.scope.pop();

    lookup = (name: string) => {
        for (let i = this.scope.length; i > 0; i--) {
            if (name in this.scope[i - 1]) {
                return this.scope[i - 1][name];
            }
        }
    }

    protected parse = (input: string): ParseNode[] => {
        const parser = new Parser(input);
        return parser.parse();
    }

    private renderChildren = (values: any[]) =>
        values.map(value => (
            value instanceof HtmlElement
                ? this.renderNode(value)
                : isArray(value)
                    ? this.renderChildren(value)
                    : value
        ))

    private renderNode = (node: HtmlElement): React.ReactElement => {
        const children = this.renderChildren(node.children);

        if (!node.tagName) {
            return <React.Fragment key={this.generateKey()}>{children}</React.Fragment>;
        }

        if (node.tagName in this.customNodes) {
            const CustomNode = this.customNodes[node.tagName];

            return (
                <CustomNode
                    key={this.generateKey()}
                    {...node.attributes}
                >
                    {children}
                </CustomNode>
            );
        }

        return React.createElement(
            node.tagName,
            {
                ...node.attributes,
                key: this.generateKey()
            },
            ...children
        );
    }

    private generateKey = () => `elem-${this.elemCount++}`;
}
