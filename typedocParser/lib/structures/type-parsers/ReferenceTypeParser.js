"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceTypeParser = void 0;
const TypeParser_1 = require("./TypeParser");
/**
 * Parses data for a reference type.
 * @since 1.0.0
 */
class ReferenceTypeParser {
    constructor(data) {
        /**
         * The kind of type this parser is for.
         * @since 1.0.0
         */
        Object.defineProperty(this, "kind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: TypeParser_1.TypeParser.Kind.Reference
        });
        /**
         * The id of this reference type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The name of this reference type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The package name of this reference type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "packageName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The type arguments of this reference type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "typeArguments", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { id, name, packageName, typeArguments } = data;
        this.id = id;
        this.name = name;
        this.packageName = packageName;
        this.typeArguments = typeArguments;
    }
    /**
     * Whether this reference type is from a package.
     * @since 1.0.0
     * @returns
     */
    isPackage() {
        return this.packageName !== null;
    }
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            kind: this.kind,
            id: this.id,
            name: this.name,
            packageName: this.packageName,
            typeArguments: this.typeArguments.map((type) => type.toJSON())
        };
    }
    /**
     * Converts this parser to a string.
     * @since 1.0.0
     * @param project The project to convert this parser to a string.
     * @returns The string representation of this parser.
     */
    toString(project) {
        return ReferenceTypeParser.formatToString({ parser: this, project });
    }
    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    static formatToString(options) {
        const { parser, project } = options;
        const typeArguments = parser.typeArguments.length > 0 ? `<${parser.typeArguments.map((type) => type.toString(project)).join(', ')}>` : '';
        return `${parser.packageName ? `${parser.packageName}.` : ''}${parser.name}${typeArguments}`;
    }
}
exports.ReferenceTypeParser = ReferenceTypeParser;
//# sourceMappingURL=ReferenceTypeParser.js.map