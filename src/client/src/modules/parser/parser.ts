import { IOperatorType, ITokenType, Lexer, ParserError } from './lexer';
import {
    AccessNode,
    ArrayAccessNode,
    ArrayNode,
    BinaryOpNode,
    CallNode,
    FunctionNode,
    HTMLExpression,
    HTMLNode,
    HTMLTextNode,
    LiteralNode,
    LoadNode,
    ObjectNode,
    ParenthesesNode,
    ParseNode,
    TernaryOpNode,
    UnaryOpNode
} from './nodes';

export class Parser {
    constructor(input: string) {
        this.lexer = new Lexer(input);
    }

    private lexer: Lexer;

    parse = (): ParseNode[] => {
        const nodes: ParseNode[] = [];

        while (this.lexer.peek('<')) {
            nodes.push(this.parseHtml());
        }

        // TODO: catch syntax errors here

        return nodes;
    }

    parseExpression = (): ParseNode => {
        return this.parseTernary();
    }

    private parseTernary = (): TernaryOpNode | ParseNode => {
        const node = this.parseBoolean();

        if (this.lexer.peek('?')) {
            this.lexer.consume();

            const ternaryNode = new TernaryOpNode();
            ternaryNode.condition = node;
            ternaryNode.thenExpr = this.parseExpression();

            this.lexer.consume(':');

            ternaryNode.elseExpr = this.parseExpression();

            return ternaryNode;
        }

        return node;
    }

    private parseBinaryExpression = (opts: {
        parseSubExpression: () => ParseNode,
        validOperators: Array<IOperatorType | ITokenType>,
    }): BinaryOpNode | ParseNode => {
        const left = opts.parseSubExpression();

        const op = this.lexer.peek();
        if (op && (
            opts.validOperators.includes(op.value as IOperatorType) ||
            opts.validOperators.includes(op.type as ITokenType)
        )) {
            this.lexer.consume();

            const right = opts.parseSubExpression();

            return new BinaryOpNode(left, op.value as IOperatorType, right);
        }

        return left;
    }

    private parseBoolean = (): BinaryOpNode | ParseNode =>
        this.parseBinaryExpression({
            parseSubExpression: () => this.parseEquality(),
            validOperators: ['&&', '||']
        })

    private parseEquality = (): BinaryOpNode | ParseNode =>
        this.parseBinaryExpression({
            parseSubExpression: () => this.parseArithmetic(),
            validOperators: [
                '===', '==',
                '!==', '!=',
                '>=', '<=',
                '>', '<'
            ]
        })

    private parseArithmetic = (): BinaryOpNode | ParseNode =>
        this.parseBinaryExpression({
            parseSubExpression: () => this.parseGeometric(),
            validOperators: ['+', '-']
        })

    private parseGeometric = (): BinaryOpNode | ParseNode =>
        this.parseBinaryExpression({
            parseSubExpression: () => this.parseUnary(),
            validOperators: ['*', '/', '%']
        })

    private parseUnary = (): UnaryOpNode | ParseNode => {
        if (this.lexer.peekOperator('-') || this.lexer.peekOperator('!')) {
            return new UnaryOpNode(this.lexer.consume().value as IOperatorType, this.parseUnary());
        }

        return this.parseAccess();
    }

    private parseAccess = (): ParseNode => {
        let expr = this.parsePrimary();

        while (this.lexer.peek('.') || this.lexer.peek('[') || this.lexer.peek('(')) {
            if (this.lexer.peek('.')) {
                this.lexer.consume('.');
                expr = new AccessNode(expr, this.lexer.consume('identifier').value as string);
            } else if (this.lexer.peek('[')) {
                this.lexer.consume('[');
                expr = new ArrayAccessNode(expr, this.parseExpression());
                this.lexer.consume(']');
            } else if (this.lexer.peek('(')) {
                this.lexer.consume('(');
                const args: ParseNode[] = [];

                if (!this.lexer.peek(')')) {
                    args.push(this.parseExpression());

                    while (this.lexer.peek(',')) {
                        this.lexer.consume(',');
                        args.push(this.parseExpression());
                    }
                }

                this.lexer.consume(')');

                expr = new CallNode(expr, args);
            }
        }

        return expr;
    }

    private parsePrimary = (): ParseNode => {
        this.lexer.peek();
        const position = this.lexer.getLastPosition();

        try {
            const result = this.lexer.switchTokenType({
                'string': () => new LiteralNode(this.lexer.consume().value),
                'number': () => new LiteralNode(this.lexer.consume().value),
                'identifier': () => new LoadNode(this.lexer.consume().value),
                '(': () => this.parseParentheses(),
                '[': () => this.parseArray(),
                '{': () => this.parseObject(),
                '<': () => this.parseHtml()
            }, () => {
                const errorToken = this.lexer.peek();
                throw new ParserError(this.lexer, this.lexer.getPosition(), `Unexpected token${errorToken ? ` '${errorToken.type}'` : ''}`);
            });

            if (this.lexer.peek('=>')) {
                this.lexer.revert(position);

                return this.parseFunction();
            }

            return result;
        } catch (e) {
            this.lexer.revert(position);
            return this.parseFunction();
        }
    }

    private parseFunction = (): FunctionNode => {
        const node = new FunctionNode();

        if (this.lexer.peek('(')) {
            this.lexer.consume('(');

            if (!this.lexer.peek(')')) {
                node.params.push(this.lexer.consume('identifier').value as string);

                while (this.lexer.peek(',')) {
                    this.lexer.consume();

                    node.params.push(this.lexer.consume('identifier').value as string);
                }
            }

            this.lexer.consume(')');
        } else {
            node.params.push(this.lexer.consume('identifier').value as string);
        }

        this.lexer.consume('=>');

        node.body = this.parseExpression();

        return node;
    }

    private parseArray = (): ArrayNode => {
        this.lexer.consume('[');

        const node = new ArrayNode();

        if (!this.lexer.peek(']')) {
            node.values.push(this.parseExpression());

            while (this.lexer.peek(',')) {
                this.lexer.consume();

                node.values.push(this.parseExpression());
            }
        }

        this.lexer.consume(']');

        return node;
    }

    private parseObject = (): ObjectNode => {
        this.lexer.consume('{');

        const node = new ObjectNode();

        const parseKVPair = () => {
            const key = this.lexer.consume('identifier').value as string;
            this.lexer.consume(':');

            node.values[key] = this.parseExpression();
        };

        if (!this.lexer.peek('}')) {
            parseKVPair();

            while (this.lexer.peek(',')) {
                this.lexer.consume();

                parseKVPair();
            }
        }

        this.lexer.consume('}');

        return node;
    }

    private parseParentheses = (): ParenthesesNode => {
        this.lexer.consume('(');
        const node = new ParenthesesNode(this.parseExpression());
        this.lexer.consume(')');
        return node;
    }

    private parseHtml = (): HTMLNode => {
        this.lexer.consume('<');

        let node: HTMLNode;

        if (this.lexer.peek('identifier')) {
            node = new HTMLNode(this.lexer.consume('identifier').value as string);
        } else {
            node = new HTMLNode(); // Fragments
        }

        while (this.lexer.peek('identifier')) {
            const attributeName = this.lexer.consume().value as string;

            if (this.lexer.peekOperator('=')) {
                this.lexer.consume();

                if (this.lexer.peek('string')) {
                    node.attributes[attributeName] = new LiteralNode(this.lexer.consume().value);
                } else {
                    this.lexer.consume('{');
                    node.attributes[attributeName] = this.parseExpression();
                    this.lexer.consume('}');
                }
            } else {
                node.attributes[attributeName] = new LiteralNode(true);
            }
        }

        if (this.lexer.peek('/>')) {
            node.isSelfClosing = true;
            return node;
        }

        this.lexer.consume('>');

        let textStart = this.lexer.getPosition();
        while (!this.lexer.peek('</')) {
            if (this.lexer.peek('<')) {
                node.childNodes.push(this.parseHtml());
            } else if (this.lexer.peek('{')) {
                this.lexer.consume('{');
                node.childNodes.push(new HTMLExpression(this.parseExpression()));
                this.lexer.consume('}');
            } else {
                const textToken = this.lexer.getUntil(['<', '</'], textStart);
                node.childNodes.push(new HTMLTextNode(textToken.value as string));
            }

            textStart = this.lexer.getPosition();
        }

        this.lexer.consume('</');
        if (node.tagName) {
            this.lexer.consumeIdentifier(node.tagName);
        }
        this.lexer.consume('>');

        return node;
    }
}
