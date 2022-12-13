import type { JSONOutput } from 'typedoc';
import { CommentParser } from './misc';
import { Parser } from './Parser';
import { TypeParser } from './type-parsers';
/**
 * Parses data from a variable reflection.
 * @since 1.0.0
 */
export declare class VariableParser extends Parser {
    /**
     * The comment parser of this variable.
     * @since 1.0.0
     */
    readonly comment: CommentParser;
    /**
     * Whether this variable is external.
     * @since 1.0.0
     */
    readonly external: boolean;
    /**
     * The type of this variable.
     * @since 1.0.0
     */
    readonly type: TypeParser;
    /**
     * The value of this variable.
     * @since 1.0.0
     */
    readonly value: string;
    constructor(data: VariableParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): VariableParser.Json;
    /**
     * Generates a new {@link VariableParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @param  The  this parser belongs to.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection: JSONOutput.DeclarationReflection): VariableParser;
    /**
     * Generates a new {@link VariableParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json: VariableParser.Json): VariableParser;
}
export declare namespace VariableParser {
    interface Data extends Parser.Data {
        /**
         * The comment parser of this variable.
         * @since 1.0.0
         */
        comment: CommentParser;
        /**
         * Whether this variable is external.
         * @since 1.0.0
         */
        external: boolean;
        /**
         * The type of this variable.
         * @since 1.0.0
         */
        type: TypeParser;
        /**
         * The value of this variable.
         * @since 1.0.0
         */
        value: string;
    }
    interface Json extends Parser.Json {
        /**
         * The comment parser of this constant.
         * @since 1.0.0
         */
        comment: CommentParser.Json;
        /**
         * Whether this variable is external.
         * @since 1.0.0
         */
        external: boolean;
        /**
         * The type of this variable in a Json compatible format.
         * @since 1.0.0
         */
        type: TypeParser.Json;
        /**
         * The value of this variable.
         * @since 1.0.0
         */
        value: string;
    }
}
//# sourceMappingURL=VariableParser.d.ts.map