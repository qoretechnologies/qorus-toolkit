"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeParameterParser = void 0;
const types_1 = require("../../types");
const type_parsers_1 = require("../type-parsers");
/**
 * Parses data from a type parameter reflection.
 * @since 1.0.0
 */
class TypeParameterParser {
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
         * The name of this type parameter.
         * @since 1.0.0
         */
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The type of this type parameter.
         * @since 1.0.0
         */
        Object.defineProperty(this, "constraint", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The default value of this type parameter.
         * @since 1.0.0
         */
        Object.defineProperty(this, "default", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { id, name, constraint, default: defaultValue } = data;
        this.id = id;
        this.name = name;
        this.constraint = constraint;
        this.default = defaultValue;
    }
    /**
     * Converts this type parameter to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this type parameter.
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            constraint: this.constraint ? this.constraint.toJSON() : null,
            default: this.default ? this.default.toJSON() : null
        };
    }
    /**
     * Generates a new {@link TypeParameterParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @param project The project this parser belongs to.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection) {
        const { kind, kindString = 'Unknown', id, name, type, default: _default } = reflection;
        if (kind !== types_1.ReflectionKind.TypeParameter) {
            throw new Error(`Expected TypeParameter (${types_1.ReflectionKind.TypeParameter}), but received ${kindString} (${kind})`);
        }
        return new TypeParameterParser({
            id,
            name,
            constraint: type ? type_parsers_1.TypeParser.generateFromTypeDoc(type) : null,
            default: _default ? type_parsers_1.TypeParser.generateFromTypeDoc(_default) : null
        });
    }
    /**
     * Generates a new {@link ClassConstructorParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json) {
        const { id, name, constraint, default: _default } = json;
        return new TypeParameterParser({
            id,
            name,
            constraint: constraint ? type_parsers_1.TypeParser.generateFromJson(constraint) : null,
            default: _default ? type_parsers_1.TypeParser.generateFromJson(_default) : null
        });
    }
}
exports.TypeParameterParser = TypeParameterParser;
//# sourceMappingURL=TypeParameterParser.js.map