import type { ProjectParser } from '../ProjectParser';
import { TypeParser } from './TypeParser';
/**
 * Parses data for a literal type.
 * @since 1.0.0
 */
export declare class LiteralTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    readonly kind = TypeParser.Kind.Literal;
    /**
     * The value of this literal type.
     * @since 1.0.0
     */
    readonly value: string;
    constructor(data: LiteralTypeParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): LiteralTypeParser.Json;
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
    static formatToString(options: TypeParser.FormatToStringOptions<LiteralTypeParser>): string;
}
export declare namespace LiteralTypeParser {
    interface Data {
        /**
         * The value of this literal type.
         * @since 5.0.0
         */
        value: string;
    }
    interface Json extends TypeParser.Json {
        kind: TypeParser.Kind.Literal;
        /**
         * The value of this literal type.
         * @since 1.0.0
         */
        value: string;
    }
}
//# sourceMappingURL=LiteralTypeParser.d.ts.map