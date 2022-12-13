import type { ProjectParser } from '../ProjectParser';
import { TypeParser } from './TypeParser';
/**
 * Parses data for an optional type.
 * @since 1.0.0
 */
export declare class OptionalTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    readonly kind = TypeParser.Kind.Optional;
    /**
     * The type of this optional type.
     * @since 1.0.0
     */
    readonly type: TypeParser;
    constructor(data: OptionalTypeParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): OptionalTypeParser.Json;
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
    static formatToString(options: TypeParser.FormatToStringOptions<OptionalTypeParser>): string;
}
export declare namespace OptionalTypeParser {
    interface Data {
        /**
         * The type of this optional type.
         * @since 5.0.0
         */
        type: TypeParser;
    }
    interface Json extends TypeParser.Json {
        kind: TypeParser.Kind.Optional;
        /**
         * The type of this optional type in a Json compatible format.
         * @since 1.0.0
         */
        type: TypeParser.Json;
    }
}
//# sourceMappingURL=OptionalTypeParser.d.ts.map