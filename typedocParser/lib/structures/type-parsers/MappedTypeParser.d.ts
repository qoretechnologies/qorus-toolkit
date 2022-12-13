import type { ProjectParser } from '../ProjectParser';
import { TypeParser } from './TypeParser';
/**
 * Parses data for a mapped type.
 * @since 1.0.0
 */
export declare class MappedTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    readonly kind = TypeParser.Kind.Mapped;
    /**
     * The parameter name of this mapped type.
     * @since 1.0.0
     */
    readonly parameter: string;
    /**
     * The parameter type of this mapped type.
     * @since 1.0.0
     */
    readonly parameterType: TypeParser;
    /**
     * The name type of this mapped type.
     * @since 1.0.0
     */
    readonly nameType: TypeParser | null;
    /**
     * The template type of this mapped type.
     * @since 1.0.0
     */
    readonly templateType: TypeParser;
    /**
     * The readonly modifier of this mapped type.
     * @since 1.0.0
     */
    readonly readonly: MappedTypeParser.Modifier | null;
    /**
     * The optional modifier of this mapped type.
     * @since 1.0.0
     */
    readonly optional: MappedTypeParser.Modifier | null;
    constructor(data: MappedTypeParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): MappedTypeParser.Json;
    /**
     * Converts this parser to a string.
     * @since 1.0.0
     * @returns The string representation of this parser.
     */
    toString(project?: ProjectParser): string;
    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    static formatToString(options: TypeParser.FormatToStringOptions<MappedTypeParser>): string;
}
export declare namespace MappedTypeParser {
    interface Data {
        /**
         * The parameter name of this mapped type.
         * @since 5.0.0
         */
        parameter: string;
        /**
         * The parameter type of this mapped type.
         * @since 5.0.0
         */
        parameterType: TypeParser;
        /**
         * The name type of this mapped type.
         * @since 5.0.0
         */
        nameType: TypeParser | null;
        /**
         * The template type of this mapped type.
         * @since 5.0.0
         */
        templateType: TypeParser;
        /**
         * The readonly modifier of this mapped type.
         * @since 5.0.0
         */
        readonly: Modifier | null;
        /**
         * The optional modifier of this mapped type.
         * @since 5.0.0
         */
        optional: Modifier | null;
    }
    interface Json extends TypeParser.Json {
        kind: TypeParser.Kind.Mapped;
        /**
         * The parameter name of this mapped type.
         * @since 1.0.0
         */
        parameter: string;
        /**
         * The parameter type of this mapped type in a Json compatible format.
         * @since 1.0.0
         */
        parameterType: TypeParser.Json;
        /**
         * The name type of this mapped type in a Json compatible format.
         * @since 1.0.0
         */
        nameType: TypeParser.Json | null;
        /**
         * The template type of this mapped type in a Json compatible format.
         * @since 1.0.0
         */
        templateType: TypeParser.Json;
        /**
         * The readonly modifier of this mapped type.
         * @since 1.0.0
         */
        readonly: Modifier | null;
        /**
         * The optional modifier of this mapped type.
         * @since 1.0.0
         */
        optional: Modifier | null;
    }
    /**
     * The modifier for a mapped type.
     */
    enum Modifier {
        Add = "+",
        Remove = "-"
    }
}
//# sourceMappingURL=MappedTypeParser.d.ts.map