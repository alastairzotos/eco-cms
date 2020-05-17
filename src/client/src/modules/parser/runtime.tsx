import { Dictionary } from 'lodash';
import * as React from 'react';

import { HTMLNode, ParseNode } from './nodes';
import { Parser } from './parser';

export class Runtime {
    constructor(
        public customNodes: Dictionary<any>,
        scope: Dictionary<any>
    ) {
        this.scope = [scope];
    }

    private scope: Array<Dictionary<any>> = [];

    render = (input: string) => null;
    renderNode = (node: HTMLNode) => null;

    evaluateNode = (node: ParseNode) => node.evaluate(this);

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
}

export class ReactRuntime extends Runtime {
    constructor(
        customNodes: Dictionary<React.FC<any>>,
        scope: Dictionary<any>
    ) {
        super(customNodes, scope);
    }

    private elemCount: number = 0;

    run = (input: string) => {
        this.elemCount = 0;
        const nodes = this.parse(input);

        return (
            <>
            {
                nodes.map(node => node.evaluate(this))
            }
            </>
        );
    }

    renderNode = (node: HTMLNode): React.ReactElement => {
        if (!node.tagName) {
            return <React.Fragment key={this.generateKey()}>{node.evaluateChildren(this)}</React.Fragment>;
        }

        if (node.tagName in this.customNodes) {
            const CustomNode = this.customNodes[node.tagName];

            return (
                <CustomNode
                    {...node.evaluateAttributes(this)}
                    key={this.generateKey()}
                >
                    {node.evaluateChildren(this)}
                </CustomNode>
            );
        }

        return React.createElement(
            node.tagName,
            {
                ...node.evaluateAttributes(this),
                key: this.generateKey()
            },
            ...node.evaluateChildren(this)
        );
    }
    private generateKey = () => `elem-${this.elemCount++}`;
}
