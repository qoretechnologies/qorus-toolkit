import type { JSONOutput } from 'typedoc';
import { CommentParser, SignatureParser } from './misc';
import { Parser } from './Parser';
/**
 * Parses data from a function reflection.
 * @since 1.0.0
 */
export declare class FunctionParser extends Parser {
    /**
     * The comment parser of this function.
     * @since 1.0.0
     */
    readonly comment: CommentParser;
    /**
     * Whether this function is external.
     * @since 1.0.0
     */
    readonly external: boolean;
    /**
     * The signature parsers of this function.
     * @since 1.0.0
     */
    readonly signatures: SignatureParser[];
    constructor(data: FunctionParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): FunctionParser.Json;
    /**
     * Generates a new {@link FunctionParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection: JSONOutput.DeclarationReflection): FunctionParser;
    /**
     * Generates a new {@link FunctionParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json: FunctionParser.Json): FunctionParser;
}
export declare namespace FunctionParser {
    interface Data extends Parser.Data {
        /**
         * The comment parser of this function.
         * @since 1.0.0
         */
        comment: CommentParser;
        /**
         * Whether this function is external.
         * @since 1.0.0
         */
        external: boolean;
        /**
         * The signature parsers of this function.
         * @since 1.0.0
         */
        signatures: SignatureParser[];
    }
    interface Json extends Parser.Json {
        /**
         * The comment parser of this function.
         * @since 1.0.0
         */
        comment: CommentParser.Json;
        /**
         * Whether this function is external.
         * @since 1.0.0
         */
        external: boolean;
        /**
         * The signature parsers of this function in a Json compatible format.
         * @since 1.0.0
         */
        signatures: SignatureParser.Json[];
    }
}
//# sourceMappingURL=FunctionParser.d.ts.map