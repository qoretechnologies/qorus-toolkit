"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterfaceMethodParser = void 0;
const types_1 = require("../../types");
const misc_1 = require("../misc");
const Parser_1 = require("../Parser");
/**
 * Parses data from an interface method reflection.
 * @since 3.1.0
 */
class InterfaceMethodParser extends Parser_1.Parser {
    constructor(data) {
        super(data);
        /**
         * The id of the parent interface parser.
         * @since 4.0.0
         */
        Object.defineProperty(this, "parentId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The signature parsers of this method.
         * @since 3.1.0
         */
        Object.defineProperty(this, "signatures", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { parentId, signatures } = data;
        this.parentId = parentId;
        this.signatures = signatures;
    }
    /**
     * Convert this parser to a Json compatible format.
     * @since 3.1.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            ...super.toJSON(),
            parentId: this.parentId,
            signatures: this.signatures.map((signature) => signature.toJSON())
        };
    }
    /**
     * Generates a new {@link InterfaceMethodParser} instance from the given data.
     * @since 3.1.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection, parentId) {
        const { kind, kindString = 'Unknown', id, name, sources = [], signatures = [] } = reflection;
        if (kind !== types_1.ReflectionKind.Method)
            throw new Error(`Expected Method (${types_1.ReflectionKind.Method}), but received ${kindString} (${kind})`);
        return new InterfaceMethodParser({
            id,
            name,
            source: sources.length ? misc_1.SourceParser.generateFromTypeDoc(sources[0]) : null,
            parentId,
            signatures: signatures.map((signature) => misc_1.SignatureParser.generateFromTypeDoc(signature))
        });
    }
    /**
     * Generates a new {@link InterfaceMethodParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json) {
        const { id, name, source, parentId, signatures } = json;
        return new InterfaceMethodParser({
            id,
            name,
            source: source ? misc_1.SourceParser.generateFromJson(source) : null,
            parentId,
            signatures: signatures.map((signature) => misc_1.SignatureParser.generateFromJson(signature))
        });
    }
}
exports.InterfaceMethodParser = InterfaceMethodParser;
//# sourceMappingURL=InterfaceMethodParser.js.map