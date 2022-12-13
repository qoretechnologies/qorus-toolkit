import type { JSONOutput } from 'typedoc';
/**
 * Parses data from a source reflection.
 * @since 1.0.0
 */
export declare class SourceParser {
    /**
     * The line number of this source.
     * @since 1.0.0
     */
    readonly line: number;
    /**
     * The file name of this source.
     * @since 1.0.0
     */
    readonly file: string;
    /**
     * The path of this source.
     * @since 1.0.0
     */
    readonly path: string;
    /**
     * The url of this source.
     * @since 2.4.0
     */
    readonly url: string | null;
    constructor(data: SourceParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): SourceParser.Json;
    /**
     * Generates a new {@link SourceParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection: JSONOutput.SourceReference): SourceParser;
    /**
     * Generates a new {@link ClassConstructorParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json: SourceParser.Json): SourceParser;
}
export declare namespace SourceParser {
    interface Data {
        /**
         * The line number of this source.
         * @since 1.0.0
         */
        line: number;
        /**
         * The file name of this source.
         * @since 1.0.0
         */
        file: string;
        /**
         * The path of this source.
         * @since 1.0.0
         */
        path: string;
        /**
         * The url of this source.
         * @since 2.4.0
         */
        url: string | null;
    }
    interface Json {
        /**
         * The line number of this source.
         * @since 1.0.0
         */
        line: number;
        /**
         * The file name of this source.
         * @since 1.0.0
         */
        file: string;
        /**
         * The path of this source.
         * @since 1.0.0
         */
        path: string;
        /**
         * The url of this source.
         * @since 2.4.0
         */
        url: string | null;
    }
}
//# sourceMappingURL=SourceParser.d.ts.map