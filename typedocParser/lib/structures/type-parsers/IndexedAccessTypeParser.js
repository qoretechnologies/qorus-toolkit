"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexedAccessTypeParser = void 0;
const TypeParser_1 = require("./TypeParser");
/**
 * Parses data for an indexed access type.
 * @since 1.0.0
 */
class IndexedAccessTypeParser {
    constructor(data) {
        /**
         * The kind of type this parser is for.
         * @since 1.0.0
         */
        Object.defineProperty(this, "kind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: TypeParser_1.TypeParser.Kind.IndexedAccess
        });
        /**
         * The object type of this indexed access type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "objectType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The index type of this indexed access type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "indexType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { objectType, indexType } = data;
        this.objectType = objectType;
        this.indexType = indexType;
    }
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            kind: this.kind,
            objectType: this.objectType.toJSON(),
            indexType: this.indexType.toJSON()
        };
    }
    /**
     * Converts this parser to a string.
     * @since 1.0.0
     * @returns The string representation of this parser.
     */
    toString(project) {
        return IndexedAccessTypeParser.formatToString({ parser: this, project });
    }
    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    static formatToString(options) {
        const { parser, project } = options;
        return `${parser.objectType.toString(project)}[${parser.indexType.toString(project)}]`;
    }
}
exports.IndexedAccessTypeParser = IndexedAccessTypeParser;
//# sourceMappingURL=IndexedAccessTypeParser.js.map