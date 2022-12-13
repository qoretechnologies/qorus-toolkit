import type { ProjectParser } from '../ProjectParser';
import type { ReferenceTypeParser } from './ReferenceTypeParser';
import { TypeParser } from './TypeParser';
/**
 * Parses data for a query type.
 * @since 1.0.0
 */
export declare class QueryTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    readonly kind = TypeParser.Kind.Query;
    /**
     * The query of this query type.
     * @since 1.0.0
     */
    readonly query: ReferenceTypeParser;
    constructor(data: QueryTypeParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): QueryTypeParser.Json;
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
    static formatToString(options: TypeParser.FormatToStringOptions<QueryTypeParser>): string;
}
export declare namespace QueryTypeParser {
    interface Data {
        /**
         * The query of this query type.
         * @since 5.0.0
         */
        query: ReferenceTypeParser;
    }
    interface Json extends TypeParser.Json {
        kind: TypeParser.Kind.Query;
        /**
         * The query of this query type in a Json compatible format.
         * @since 1.0.0
         */
        query: ReferenceTypeParser.Json;
    }
}
//# sourceMappingURL=QueryTypeParser.d.ts.map