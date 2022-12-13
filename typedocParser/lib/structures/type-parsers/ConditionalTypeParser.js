"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionalTypeParser = void 0;
const TypeParser_1 = require("./TypeParser");
/**
 * Parses data for a conditional type.
 * @since 1.0.0
 */
class ConditionalTypeParser {
    constructor(data) {
        /**
         * The kind of type this parser is for.
         * @since 1.0.0
         */
        Object.defineProperty(this, "kind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: TypeParser_1.TypeParser.Kind.Conditional
        });
        /**
         * The check type of this conditional type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "checkType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The extends type of this conditional type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "extendsType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The type of this conditional type when the check type is true.
         * @since 1.0.0
         */
        Object.defineProperty(this, "trueType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The type of this conditional type when the check type is false.
         * @since 1.0.0
         */
        Object.defineProperty(this, "falseType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { checkType, extendsType, trueType, falseType } = data;
        this.checkType = checkType;
        this.extendsType = extendsType;
        this.trueType = trueType;
        this.falseType = falseType;
    }
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            kind: this.kind,
            checkType: this.checkType.toJSON(),
            extendsType: this.extendsType.toJSON(),
            trueType: this.trueType.toJSON(),
            falseType: this.falseType.toJSON()
        };
    }
    /**
     * Converts this parser to a string.
     * @since 1.0.0
     * @returns The string representation of this parser.
     */
    toString(project) {
        return ConditionalTypeParser.formatToString({ parser: this, project });
    }
    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    static formatToString(options) {
        const { parser, project } = options;
        return `${TypeParser_1.TypeParser.wrap(parser.checkType, TypeParser_1.TypeParser.BindingPowers[TypeParser_1.TypeParser.Kind.Conditional])} extends ${parser.extendsType.toString(project)} ? ${parser.trueType.toString(project)} : ${parser.falseType.toString(project)}`;
    }
}
exports.ConditionalTypeParser = ConditionalTypeParser;
//# sourceMappingURL=ConditionalTypeParser.js.map