"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MappedTypeParser = void 0;
const TypeParser_1 = require("./TypeParser");
/**
 * Parses data for a mapped type.
 * @since 1.0.0
 */
class MappedTypeParser {
    constructor(data) {
        /**
         * The kind of type this parser is for.
         * @since 1.0.0
         */
        Object.defineProperty(this, "kind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: TypeParser_1.TypeParser.Kind.Mapped
        });
        /**
         * The parameter name of this mapped type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "parameter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The parameter type of this mapped type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "parameterType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The name type of this mapped type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "nameType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The template type of this mapped type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "templateType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The readonly modifier of this mapped type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "readonly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The optional modifier of this mapped type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "optional", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { parameter, parameterType, nameType, templateType, readonly, optional } = data;
        this.parameter = parameter;
        this.parameterType = parameterType;
        this.nameType = nameType;
        this.templateType = templateType;
        this.readonly = readonly;
        this.optional = optional;
    }
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            kind: this.kind,
            parameter: this.parameter,
            parameterType: this.parameterType.toJSON(),
            nameType: this.nameType ? this.nameType.toJSON() : null,
            templateType: this.templateType.toJSON(),
            readonly: this.readonly,
            optional: this.optional
        };
    }
    /**
     * Converts this parser to a string.
     * @since 1.0.0
     * @returns The string representation of this parser.
     */
    toString(project) {
        return MappedTypeParser.formatToString({ parser: this, project });
    }
    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    static formatToString(options) {
        const { parser, project } = options;
        const readonly = parser.readonly === MappedTypeParser.Modifier.Add ? 'readonly' : parser.readonly === MappedTypeParser.Modifier.Remove ? '-readonly' : '';
        const optional = parser.optional === MappedTypeParser.Modifier.Add ? '?' : parser.optional === MappedTypeParser.Modifier.Remove ? '-?' : '';
        return `{ ${readonly}[${parser.parameter} in ${parser.parameterType.toString(project)}]${optional}: ${parser.templateType.toString(project)} }`;
    }
}
exports.MappedTypeParser = MappedTypeParser;
(function (MappedTypeParser) {
    /**
     * The modifier for a mapped type.
     */
    let Modifier;
    (function (Modifier) {
        Modifier["Add"] = "+";
        Modifier["Remove"] = "-";
    })(Modifier = MappedTypeParser.Modifier || (MappedTypeParser.Modifier = {}));
})(MappedTypeParser = exports.MappedTypeParser || (exports.MappedTypeParser = {}));
//# sourceMappingURL=MappedTypeParser.js.map