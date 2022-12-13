import type { SourceParser } from './misc';
/**
 * The base parser for all top level exported parsers.
 * @since 1.0.0
 */
export declare abstract class Parser {
    /**
     * The identifier of this parser.
     * @since 1.0.0
     */
    readonly id: number;
    /**
     * The name of this parser.
     * @since 1.0.0
     */
    readonly name: string;
    /**
     * The source parser for this parser.
     * @since 1.0.0
     */
    readonly source: SourceParser | null;
    constructor(data: Parser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): Parser.Json;
}
export declare namespace Parser {
    interface Data {
        /**
         * The identifier for this parser.
         * @since 1.0.0
         */
        id: number;
        /**
         * The name for this parser.
         * @since 1.0.0
         */
        name: string;
        /**
         * The source parser for this parser.
         * @since 1.0.0
         */
        source: SourceParser | null;
    }
    interface Json {
        /**
         * The identifier for this parser.
         * @since 1.0.0
         */
        id: number;
        /**
         * The name for this parser.
         * @since 1.0.0
         */
        name: string;
        /**
         * The source parser for this parser in a Json compatible format.
         * @since 1.0.0
         */
        source: SourceParser.Json | null;
    }
}
//# sourceMappingURL=Parser.d.ts.map