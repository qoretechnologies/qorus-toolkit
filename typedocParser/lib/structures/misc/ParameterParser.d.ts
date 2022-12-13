import type { JSONOutput } from 'typedoc';
import { TypeParser } from '../type-parsers';
import { CommentParser } from './CommentParser';
/**
 * Parses data from a parameter reflection.
 * @since 1.0.0
 */
export declare class ParameterParser {
    /**
     * The identifier of this parser.
     * @since 1.0.0
     */
    readonly id: number;
    /**
     * The name of this parameter.
     * @since 1.0.0
     */
    readonly name: string;
    /**
     * The comment of this parameter.
     * @since 5.3.0
     */
    readonly comment: CommentParser;
    /**
     * The type of this parameter.
     * @since 1.0.0
     */
    readonly type: TypeParser;
    readonly flags: any;
    constructor(data: ParameterParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): ParameterParser.Json;
    /**
     * Generates a new {@link ParameterParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection: JSONOutput.DeclarationReflection): ParameterParser;
    /**
     * Generates a new {@link ClassConstructorParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json: ParameterParser.Json): ParameterParser;
}
export declare namespace ParameterParser {
    interface Data {
        /**
         * The identifier of this parser.
         * @since 1.0.0
         */
        id: number;
        /**
         * The name of this parameter.
         * @since 1.0.0
         */
        name: string;
        /**
         * The comment of this parameter.
         * @since 5.3.0
         */
        comment: CommentParser;
        /**
         * The type of this parameter.
         * @since 1.0.0
         */
        type: TypeParser;
        flags: any;
    }
    interface Json {
        /**
         * The identifier of this parser.
         * @since 1.0.0
         */
        id: number;
        /**
         * The name of this parameter.
         * @since 1.0.0
         */
        name: string;
        /**
         * The comment of this parameter.
         * @since 5.3.0
         */
        comment: CommentParser.Json;
        /**
         * The type of this parameter in a Json compatible format.
         * @since 1.0.0
         */
        type: TypeParser.Json;
        flags: any;
    }
}
//# sourceMappingURL=ParameterParser.d.ts.map