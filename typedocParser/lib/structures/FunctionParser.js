"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionParser = void 0;
const types_1 = require("../types");
const misc_1 = require("./misc");
const Parser_1 = require("./Parser");
/**
 * Parses data from a function reflection.
 * @since 1.0.0
 */
class FunctionParser extends Parser_1.Parser {
    constructor(data) {
        super(data);
        /**
         * The comment parser of this function.
         * @since 1.0.0
         */
        Object.defineProperty(this, "comment", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Whether this function is external.
         * @since 1.0.0
         */
        Object.defineProperty(this, "external", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The signature parsers of this function.
         * @since 1.0.0
         */
        Object.defineProperty(this, "signatures", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { comment, external, signatures } = data;
        this.comment = comment;
        this.external = external;
        this.signatures = signatures;
    }
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            ...super.toJSON(),
            comment: this.comment.toJSON(),
            external: this.external,
            signatures: this.signatures.map((signature) => signature.toJSON())
        };
    }
    /**
     * Generates a new {@link FunctionParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection) {
        const { kind, kindString = 'Unknown', id, name, comment = { summary: [] }, sources = [], flags, signatures = [] } = reflection;
        if (kind !== types_1.ReflectionKind.Function)
            throw new Error(`Expected Function (${types_1.ReflectionKind.Function}), but received ${kindString} (${kind})`);
        return new FunctionParser({
            id,
            name,
            comment: misc_1.CommentParser.generateFromTypeDoc(comment),
            source: sources.length ? misc_1.SourceParser.generateFromTypeDoc(sources[0]) : null,
            external: Boolean(flags.isExternal),
            signatures: signatures.map((signature) => misc_1.SignatureParser.generateFromTypeDoc(signature))
        });
    }
    /**
     * Generates a new {@link FunctionParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json) {
        const { id, name, comment, source, external, signatures } = json;
        return new FunctionParser({
            id,
            name,
            comment: misc_1.CommentParser.generateFromJson(comment),
            source: source ? misc_1.SourceParser.generateFromJson(source) : null,
            external,
            signatures: signatures.map((signature) => misc_1.SignatureParser.generateFromJson(signature))
        });
    }
}
exports.FunctionParser = FunctionParser;
//# sourceMappingURL=FunctionParser.js.map