"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterParser = void 0;
const types_1 = require("../../types");
const type_parsers_1 = require("../type-parsers");
const CommentParser_1 = require("./CommentParser");
/**
 * Parses data from a parameter reflection.
 * @since 1.0.0
 */
class ParameterParser {
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
         * The name of this parameter.
         * @since 1.0.0
         */
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The comment of this parameter.
         * @since 5.3.0
         */
        Object.defineProperty(this, "comment", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The type of this parameter.
         * @since 1.0.0
         */
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "flags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { id, name, comment, type, flags } = data;
        this.id = id;
        this.name = name;
        this.comment = comment;
        this.type = type;
        this.flags = flags;
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
            comment: this.comment.toJSON(),
            type: this.type.toJSON(),
            flags: this.flags
        };
    }
    /**
     * Generates a new {@link ParameterParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection) {
        const { kind, kindString = 'Unknown', id, name, comment = { summary: [] }, type, flags } = reflection;
        if (kind !== types_1.ReflectionKind.Parameter) {
            throw new Error(`Expected Parameter (${types_1.ReflectionKind.Parameter}), but received ${kindString} (${kind})`);
        }
        return new ParameterParser({
            id,
            name,
            comment: CommentParser_1.CommentParser.generateFromTypeDoc(comment),
            type: type_parsers_1.TypeParser.generateFromTypeDoc(type),
            flags
        });
    }
    /**
     * Generates a new {@link ClassConstructorParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json) {
        const { id, name, comment, type, flags } = json;
        return new ParameterParser({
            id,
            name,
            comment: CommentParser_1.CommentParser.generateFromJson(comment),
            type: type_parsers_1.TypeParser.generateFromJson(type),
            flags
        });
    }
}
exports.ParameterParser = ParameterParser;
//# sourceMappingURL=ParameterParser.js.map