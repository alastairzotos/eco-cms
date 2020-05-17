import { Dictionary } from 'lodash';
import * as React from 'react';

import { HTMLNode, ParseNode } from './nodes';
import { Parser } from './parser';

export class Renderer {
    constructor(public customNodes: Dictionary<any>) {
        // tslint:disable-line   
    }

    render = (input: string) => null;

    renderNode = (node: HTMLNode) => null;

    protected parse = (input: string): ParseNode[] => {
        const parser = new Parser(input);
        return parser.parse();
    }
}

export class ReactRenderer extends Renderer {
    constructor(customNodes: Dictionary<React.FC<any>>) {
        super(customNodes);
    }

    private elemCount: number = 0;

    render = (input: string) => {
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
