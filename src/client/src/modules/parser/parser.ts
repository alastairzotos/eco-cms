import { Lexer } from './lexer';
import { HTMLNode, HTMLTextNode, LiteralNode, ParseNode } from './nodes';

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
        return this.parsePrimary();
    }

    parsePrimary = (): ParseNode =>
        this.lexer.switchTokenType({
            string: () => new LiteralNode(this.lexer.consume().value),
            number: () => new LiteralNode(this.lexer.consume().value)
        })

    private parseHtml = (): HTMLNode => {
        this.lexer.consume('<');
        const node = new HTMLNode(this.lexer.consume('identifier').value as string);

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
            } else {
                const textToken = this.lexer.getUntil(['<', '</'], textStart);
                node.childNodes.push(new HTMLTextNode(textToken.value as string));
            }

            textStart = this.lexer.getPosition();
        }

        this.lexer.consume('</');
        this.lexer.consumeIdentifier(node.tagName);
        this.lexer.consume('>');

        return node;
    }
}
