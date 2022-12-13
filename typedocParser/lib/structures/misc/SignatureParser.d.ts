import type { JSONOutput } from 'typedoc';
import { TypeParser } from '../type-parsers';
import { CommentParser } from './CommentParser';
import { ParameterParser } from './ParameterParser';
import { TypeParameterParser } from './TypeParameterParser';
/**
 * Parses data from a signature reflection.
 * @since 1.0.0
 */
export declare class SignatureParser {
    /**
     * The identifier of this parser.
     * @since 1.0.0
     */
    readonly id: number;
    /**
     * The name of this signature.
     * @since 1.0.0
     */
    readonly name: string;
    /**
     * The comment parser of this signature.
     * @since 2.3.0
     */
    readonly comment: CommentParser;
    /**
     * The type parameters of this signature.
     * @since 1.0.0
     */
    readonly typeParameters: TypeParameterParser[];
    /**
     * The parameters of this signature.
     * @since 1.0.0
     */
    readonly parameters: ParameterParser[];
    /**
     * The return type of this signature.
     * @since 1.0.0
     */
    readonly returnType: TypeParser;
    constructor(data: SignatureParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): SignatureParser.Json;
    /**
     * Generates a new {@link SignatureParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection: JSONOutput.SignatureReflection): SignatureParser;
    /**
     * Generates a new {@link ClassConstructorParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json: SignatureParser.Json): SignatureParser;
}
export declare namespace SignatureParser {
    interface Data {
        /**
         * The identifier of this parser.
         * @since 1.0.0
         */
        id: number;
        /**
         * The name of this signature.
         * @since 1.0.0
         */
        name: string;
        /**
         * The comment of this signature.
         * @since 2.3.0
         */
        comment: CommentParser;
        /**
         * The type parameters of this signature.
         * @since 1.0.0
         */
        typeParameters: TypeParameterParser[];
        /**
         * The parameters of this signature.
         * @since 1.0.0
         */
        parameters: ParameterParser[];
        /**
         * The return type of this signature.
         * @since 1.0.0
         */
        returnType: TypeParser;
    }
    interface Json {
        /**
         * The identifier of this parser.
         * @since 1.0.0
         */
        id: number;
        /**
         * The name of this signature.
         * @since 1.0.0
         */
        name: string;
        /**
         * The comment of this signature.
         * @since 2.3.0
         */
        comment: CommentParser.Json;
        /**
         * The type parameters of this signature in a Json compatible format.
         * @since 1.0.0
         */
        typeParameters: TypeParameterParser.Json[];
        /**
         * The parameters of this signature in a Json compatible format.
         * @since 1.0.0
         */
        parameters: ParameterParser.Json[];
        /**
         * The return type of this signature in a Json compatible format.
         * @since 1.0.0
         */
        returnType: TypeParser.Json;
    }
}
//# sourceMappingURL=SignatureParser.d.ts.map