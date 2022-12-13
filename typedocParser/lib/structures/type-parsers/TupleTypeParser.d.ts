import type { ProjectParser } from '../ProjectParser';
import { TypeParser } from './TypeParser';
/**
 * Parses data for a tuple type.
 * @since 1.0.0
 */
export declare class TupleTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    readonly kind = TypeParser.Kind.Tuple;
    /**
     * The types of this tuple type.
     * @since 1.0.0
     */
    readonly types: TypeParser[];
    constructor(data: TupleTypeParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): TupleTypeParser.Json;
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
    static formatToString(options: TypeParser.FormatToStringOptions<TupleTypeParser>): string;
}
export declare namespace TupleTypeParser {
    interface Data {
        /**
         * The types of this tuple type.
         * @since 5.0.0
         */
        types: TypeParser[];
    }
    interface Json extends TypeParser.Json {
        kind: TypeParser.Kind.Tuple;
        /**
         * The types of this tuple type in a Json compatible format.
         * @since 1.0.0
         */
        types: TypeParser.Json[];
    }
}
//# sourceMappingURL=TupleTypeParser.d.ts.map