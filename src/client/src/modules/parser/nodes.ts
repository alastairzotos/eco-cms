import { Dictionary } from '@reduxjs/toolkit';

import { HtmlElement } from './html';
import { IOperatorType, ITokenType } from './lexer';
import { Runtime } from './runtime';

export enum NodeType {
    None,
    HTMLElement,
    HTMLText,
    HTMLExpression,
    Literal,
    Load,
    Access,
    ArrayAccess,
    Call,
    Array,
    Object,
    Parentheses,
    Function,
    BinaryOp,
    UnaryOp,
    TernaryOp
}

export class ParseNode {
    constructor(public nodeType: NodeType) {}

    evaluate = (runtime: Runtime): any => null;
}

export class HTMLNode extends ParseNode {
    constructor(public tagName?: string) {
        super(NodeType.HTMLElement);
    }

    childNodes: Array<HTMLNode | HTMLTextNode | HTMLExpression> = [];
    attributes: Dictionary<ParseNode> = {};
    isSelfClosing: boolean;

    evaluate = (runtime: Runtime) =>
        new HtmlElement(
            this.tagName,
            Object.keys(this.attributes).reduce((cur, key) => ({
                ...cur,
                [key]: this.attributes[key].evaluate(runtime)
            }), {}),
            this.childNodes.map(child => child.evaluate(runtime))
        )

    evaluateAttributes = (runtime: Runtime, key?: any) =>
        Object.keys(this.attributes).reduce((cur, attr) => ({
            ...cur,
            [attr]: this.attributes[attr].evaluate(runtime)
        }), { key })

    evaluateChildren = (runtime: Runtime) =>
        this.childNodes.map(child => child.evaluate(runtime))
}

export class HTMLTextNode extends ParseNode {
    constructor(public text: string) {
        super(NodeType.HTMLText);
    }

    evaluate = () => this.text;
}

export class HTMLExpression extends ParseNode {
    constructor(public expression: ParseNode) {
        super(NodeType.HTMLExpression);
    }

    evaluate = (runtime: Runtime) => this.expression.evaluate(runtime);
}

export class LiteralNode extends ParseNode {
    constructor(public value: any) {
        super(NodeType.Literal);
    }

    evaluate = () => this.value;
}

export class LoadNode extends ParseNode {
    constructor(public varName: string) {
        super(NodeType.Load);
    }

    evaluate = (runtime: Runtime) => runtime.lookup(this.varName);
}

export class AccessNode extends ParseNode {
    constructor(public object: ParseNode, public fieldName: string) {
        super(NodeType.Access);
    }

    evaluate = (runtime: Runtime) =>
        this.object.evaluate(runtime)[this.fieldName]
}

export class ArrayAccessNode extends ParseNode {
    constructor(public object: ParseNode, public index: ParseNode) {
        super(NodeType.ArrayAccess);
    }

    evaluate = (runtime: Runtime) =>
        this.object.evaluate(runtime)[this.index.evaluate(runtime)]
}

export class CallNode extends ParseNode {
    constructor(public object: ParseNode, public args: ParseNode[]) {
        super(NodeType.Call);
    }

    evaluate = (runtime: Runtime) => {
        const args = this.args.map(arg => arg.evaluate(runtime));

        if (this.object instanceof AccessNode) {
            return this.object.evaluate(runtime).apply(this.object.object.evaluate(runtime), args);
        }

        return this.object.evaluate(runtime).apply(null, args);
    }
}

export class ArrayNode extends ParseNode {
    constructor() {
        super(NodeType.Array);
    }

    values: ParseNode[] = [];

    evaluate = (runtime: Runtime) =>
        this.values.map(value => value.evaluate(runtime))
}

export class ObjectNode extends ParseNode {
    constructor() {
        super(NodeType.Object);
    }

    values: Dictionary<ParseNode> = {};

    evaluate = (runtime: Runtime) =>
        Object.keys(this.values).reduce((cur, key) => ({
            ...cur,
            [key]: this.values[key].evaluate(runtime)
        }), {})
}

export class ParenthesesNode extends ParseNode {
    constructor(public expression: ParseNode) {
        super(NodeType.Parentheses);
    }

    evaluate = (runtime: Runtime) => this.expression.evaluate(runtime);
}

export class FunctionNode extends ParseNode {
    constructor() {
        super(NodeType.Function);
    }

    params: string[] = [];
    body: ParseNode;

    evaluate = (runtime: Runtime) =>
        (...args) => {
            const scope = this.params.reduce((cur, key, index) => ({
                ...cur,
                [key]: args[index]
            }), {});

            runtime.pushScope(scope);
            const result = this.body.evaluate(runtime);
            runtime.popScope();

            return result;
        }
}

export class BinaryOpNode extends ParseNode {
    constructor(public left: ParseNode, public opType: IOperatorType | ITokenType, public right: ParseNode) {
        super(NodeType.BinaryOp);
    }

    evaluate = (runtime: Runtime) => {
        switch (this.opType) {
            case '&&': return this.left.evaluate(runtime) && this.right.evaluate(runtime);
            case '||': return this.left.evaluate(runtime) || this.right.evaluate(runtime);

            case '===': return this.left.evaluate(runtime) === this.right.evaluate(runtime);
            case '==': return this.left.evaluate(runtime) == this.right.evaluate(runtime); // tslint:disable-line

            case '!==': return this.left.evaluate(runtime) !== this.right.evaluate(runtime);
            case '!=': return this.left.evaluate(runtime) != this.right.evaluate(runtime); // tslint:disable-line

            case '>=': return this.left.evaluate(runtime) >= this.right.evaluate(runtime);
            case '>': return this.left.evaluate(runtime) > this.right.evaluate(runtime);
            case '<=': return this.left.evaluate(runtime) <= this.right.evaluate(runtime);
            case '<': return this.left.evaluate(runtime) < this.right.evaluate(runtime);

            case '+': return this.left.evaluate(runtime) + this.right.evaluate(runtime);
            case '-': return this.left.evaluate(runtime) - this.right.evaluate(runtime);
            case '*': return this.left.evaluate(runtime) * this.right.evaluate(runtime);
            case '/': return this.left.evaluate(runtime) / this.right.evaluate(runtime);
            case '%': return this.left.evaluate(runtime) % this.right.evaluate(runtime);
        }
    }
}

export class UnaryOpNode extends ParseNode {
    constructor(public opType: IOperatorType, public expr: ParseNode) {
        super(NodeType.UnaryOp);
    }

    evaluate = (runtime: Runtime) => {
        switch (this.opType) {
            case '!': return !this.expr.evaluate(runtime);
            case '-': return -this.expr.evaluate(runtime);
        }
    }
}

export class TernaryOpNode extends ParseNode {
    constructor() {
        super(NodeType.TernaryOp);
    }
    condition: ParseNode;
    thenExpr: ParseNode;
    elseExpr: ParseNode;

    evaluate = (runtime: Runtime) =>
        this.condition.evaluate(runtime)
            ? this.thenExpr.evaluate(runtime)
            : this.elseExpr.evaluate(runtime)
}
