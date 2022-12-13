import type { ProjectParser } from '../ProjectParser';
import { TypeParser } from './TypeParser';
/**
 * Parses data for a reference type.
 * @since 1.0.0
 */
export declare class ReferenceTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    readonly kind = TypeParser.Kind.Reference;
    /**
     * The id of this reference type.
     * @since 1.0.0
     */
    readonly id: number | null;
    /**
     * The name of this reference type.
     * @since 1.0.0
     */
    readonly name: string;
    /**
     * The package name of this reference type.
     * @since 1.0.0
     */
    readonly packageName: string | null;
    /**
     * The type arguments of this reference type.
     * @since 1.0.0
     */
    readonly typeArguments: TypeParser[];
    constructor(data: ReferenceTypeParser.Data);
    /**
     * Whether this reference type is from a package.
     * @since 1.0.0
     * @returns
     */
    isPackage(): boolean;
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): ReferenceTypeParser.Json;
    /**
     * Converts this parser to a string.
     * @since 1.0.0
     * @param project The project to convert this parser to a string.
     * @returns The string representation of this parser.
     */
    toString(project?: ProjectParser): string;
    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    static formatToString(options: TypeParser.FormatToStringOptions<ReferenceTypeParser>): string;
}
export declare namespace ReferenceTypeParser {
    interface Data {
        /**
         * The id of this reference type.
         * @since 5.0.0
         */
        id: number | null;
        /**
         * The name of this reference type.
         * @since 5.0.0
         */
        name: string;
        /**
         * The package name of this reference type.
         * @since 5.0.0
         */
        packageName: string | null;
        /**
         * The type arguments of this reference type.
         * @since 5.0.0
         */
        typeArguments: TypeParser[];
    }
    interface Json extends TypeParser.Json {
        kind: TypeParser.Kind.Reference;
        /**
         * The id of this reference type.
         * @since 1.0.0
         */
        id: number | null;
        /**
         * The name of this reference type.
         * @since 1.0.0
         */
        name: string;
        /**
         * The package name of this reference type.
         * @since 1.0.0
         */
        packageName: string | null;
        /**
         * The type arguments of this reference type in a Json compatible format.
         * @since 1.0.0
         */
        typeArguments: TypeParser.Json[];
    }
}
//# sourceMappingURL=ReferenceTypeParser.d.ts.map