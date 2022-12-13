import type { ProjectParser } from '../ProjectParser';
import { TypeParser } from './TypeParser';
/**
 * Parses data for a rest type.
 * @since 1.0.0
 */
export declare class RestTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    readonly kind = TypeParser.Kind.Rest;
    /**
     * The type of this rest type.
     * @since 1.0.0
     */
    readonly type: TypeParser;
    constructor(data: RestTypeParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): RestTypeParser.Json;
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
    static formatToString(options: TypeParser.FormatToStringOptions<RestTypeParser>): string;
}
export declare namespace RestTypeParser {
    interface Data {
        /**
         * The type of this rest type.
         * @since 5.0.0
         */
        type: TypeParser;
    }
    interface Json extends TypeParser.Json {
        kind: TypeParser.Kind.Rest;
        /**
         * The type of this rest type in a Json compatible format.
         * @since 1.0.0
         */
        type: TypeParser.Json;
    }
}
//# sourceMappingURL=RestTypeParser.d.ts.map