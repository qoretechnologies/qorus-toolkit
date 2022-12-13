import type { ProjectParser } from '../ProjectParser';
import { TypeParser } from './TypeParser';
/**
 * Parses data for an unknown type.
 * @since 1.0.0
 */
export declare class UnknownTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    readonly kind = TypeParser.Kind.Unknown;
    /**
     * The name of this unknown type.
     * @since 1.0.0
     */
    readonly name: string;
    constructor(data: UnknownTypeParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): UnknownTypeParser.Json;
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
    static formatToString(options: TypeParser.FormatToStringOptions<UnknownTypeParser>): string;
}
export declare namespace UnknownTypeParser {
    interface Data {
        /**
         * The name of this unknown type.
         * @since 5.0.0
         */
        name: string;
    }
    interface Json extends TypeParser.Json {
        kind: TypeParser.Kind.Unknown;
        /**
         * The name of this unknown type.
         * @since 1.0.0
         */
        name: string;
    }
}
//# sourceMappingURL=UnknownTypeParser.d.ts.map