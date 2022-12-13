"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
/**
 * The base parser for all top level exported parsers.
 * @since 1.0.0
 */
class Parser {
    constructor(data) {
        /**
         * The identifier of this parser.
         * @since 1.0.0
         */
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The name of this parser.
         * @since 1.0.0
         */
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The source parser for this parser.
         * @since 1.0.0
         */
        Object.defineProperty(this, "source", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { id, name, source } = data;
        this.id = id;
        this.name = name;
        this.source = source;
    }
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            source: this.source ? this.source.toJSON() : null
        };
    }
}
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map