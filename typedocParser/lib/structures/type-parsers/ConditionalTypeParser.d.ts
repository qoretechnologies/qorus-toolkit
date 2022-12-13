import type { ProjectParser } from '../ProjectParser';
import { TypeParser } from './TypeParser';
/**
 * Parses data for a conditional type.
 * @since 1.0.0
 */
export declare class ConditionalTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    readonly kind = TypeParser.Kind.Conditional;
    /**
     * The check type of this conditional type.
     * @since 1.0.0
     */
    readonly checkType: TypeParser;
    /**
     * The extends type of this conditional type.
     * @since 1.0.0
     */
    readonly extendsType: TypeParser;
    /**
     * The type of this conditional type when the check type is true.
     * @since 1.0.0
     */
    readonly trueType: TypeParser;
    /**
     * The type of this conditional type when the check type is false.
     * @since 1.0.0
     */
    readonly falseType: TypeParser;
    constructor(data: ConditionalTypeParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): ConditionalTypeParser.Json;
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
    static formatToString(options: TypeParser.FormatToStringOptions<ConditionalTypeParser>): string;
}
export declare namespace ConditionalTypeParser {
    interface Data {
        /**
         * The check type of this conditional type.
         * @since 5.0.0
         */
        checkType: TypeParser;
        /**
         * The extends type of this conditional type.
         * @since 5.0.0
         */
        extendsType: TypeParser;
        /**
         * The type of this conditional type when the check type is true.
         * @since 5.0.0
         */
        trueType: TypeParser;
        /**
         * The type of this conditional type when the check type is false.
         * @since 5.0.0
         */
        falseType: TypeParser;
    }
    interface Json extends TypeParser.Json {
        kind: TypeParser.Kind.Conditional;
        /**
         * The check type of this conditional type in a Json compatible format.
         * @since 1.0.0
         */
        checkType: TypeParser.Json;
        /**
         * The extends type of this conditional type in a Json compatible format.
         * @since 1.0.0
         */
        extendsType: TypeParser.Json;
        /**
         * The type of this conditional type when the check type is true in a Json compatible format.
         * @since 1.0.0
         */
        trueType: TypeParser.Json;
        /**
         * The type of this conditional type when the check type is false in a Json compatible format.
         * @since 1.0.0
         */
        falseType: TypeParser.Json;
    }
}
//# sourceMappingURL=ConditionalTypeParser.d.ts.map