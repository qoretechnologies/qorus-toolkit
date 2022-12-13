"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateLiteralTypeParser = void 0;
const TypeParser_1 = require("./TypeParser");
/**
 * Parses data for a template literal type.
 * @since 1.0.0
 */
class TemplateLiteralTypeParser {
    constructor(data) {
        /**
         * The kind of type this parser is for.
         * @since 1.0.0
         */
        Object.defineProperty(this, "kind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: TypeParser_1.TypeParser.Kind.TemplateLiteral
        });
        /**
         * The head of this template literal type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "head", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The tail of this template literal type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "tail", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { head, tail } = data;
        this.head = head;
        this.tail = tail;
    }
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            kind: this.kind,
            head: this.head,
            tail: this.tail.map((tail) => ({ type: tail.type.toJSON(), text: tail.text }))
        };
    }
    /**
     * Converts this parser to a string.
     * @since 1.0.0
     * @returns The string representation of this parser.
     */
    toString(project) {
        return TemplateLiteralTypeParser.formatToString({ parser: this, project });
    }
    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    static formatToString(options) {
        const { parser, project } = options;
        return `\`${parser.head}${parser.tail.map((tail) => `\${${tail.type.toString(project)}}${tail.text}`).join('')}\``;
    }
}
exports.TemplateLiteralTypeParser = TemplateLiteralTypeParser;
//# sourceMappingURL=TemplateLiteralTypeParser.js.map