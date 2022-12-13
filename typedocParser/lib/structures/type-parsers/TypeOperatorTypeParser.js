"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOperatorTypeParser = void 0;
const TypeParser_1 = require("./TypeParser");
/**
 * Parses data for a type operator type.
 * @since 1.0.0
 */
class TypeOperatorTypeParser {
    constructor(data) {
        /**
         * The kind of type this parser is for.
         * @since 1.0.0
         */
        Object.defineProperty(this, "kind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: TypeParser_1.TypeParser.Kind.TypeOperator
        });
        /**
         * The operator of this type operator type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "operator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The type of this type operator type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { operator, type } = data;
        this.operator = operator;
        this.type = type;
    }
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            kind: this.kind,
            operator: this.operator,
            type: this.type.toJSON()
        };
    }
    /**
     * Converts this parser to a string.
     * @since 1.0.0
     * @returns The string representation of this parser.
     */
    toString(project) {
        return TypeOperatorTypeParser.formatToString({ parser: this, project });
    }
    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    static formatToString(options) {
        const { parser, project } = options;
        return `${parser.operator} ${parser.type.toString(project)}`;
    }
}
exports.TypeOperatorTypeParser = TypeOperatorTypeParser;
(function (TypeOperatorTypeParser) {
    /**
     * The operators of a type operator type.
     */
    let Operator;
    (function (Operator) {
        Operator["KeyOf"] = "keyof";
        Operator["Unique"] = "unique";
        Operator["Readonly"] = "readonly";
    })(Operator = TypeOperatorTypeParser.Operator || (TypeOperatorTypeParser.Operator = {}));
})(TypeOperatorTypeParser = exports.TypeOperatorTypeParser || (exports.TypeOperatorTypeParser = {}));
//# sourceMappingURL=TypeOperatorTypeParser.js.map