import type { ProjectParser } from '../ProjectParser';
import { TypeParser } from './TypeParser';
/**
 * Parses data for an array type.
 * @since 1.0.0
 */
export declare class ArrayTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    readonly kind = TypeParser.Kind.Array;
    /**
     * The type of this array type.
     * @since 1.0.0
     */
    readonly type: TypeParser;
    constructor(data: ArrayTypeParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): ArrayTypeParser.Json;
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
    static formatToString(options: TypeParser.FormatToStringOptions<ArrayTypeParser>): string;
}
export declare namespace ArrayTypeParser {
    interface Data {
        /**
         * The type of this array type.
         * @since 5.0.0
         */
        type: TypeParser;
    }
    interface Json extends TypeParser.Json {
        kind: TypeParser.Kind.Array;
        /**
         * The type of this array in a Json compatible format.
         * @since 1.0.0
         */
        type: TypeParser.Json;
    }
}
//# sourceMappingURL=ArrayTypeParser.d.ts.map