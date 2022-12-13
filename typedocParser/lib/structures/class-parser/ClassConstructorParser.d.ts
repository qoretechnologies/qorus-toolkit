import type { JSONOutput } from 'typedoc';
import { CommentParser, ParameterParser } from '../misc';
import { Parser } from '../Parser';
import { ClassParser } from './ClassParser';
export declare class ClassConstructorParser extends Parser {
    /**
     * The comment parser of this constructor.
     * @since 1.0.0
     */
    readonly comment: CommentParser;
    /**
     * The id of the parent class parser.
     * @since 4.0.0
     */
    readonly parentId: number;
    /**
     * The accessibility of this constructor.
     * @since 7.0.0
     */
    accessibility: ClassParser.Accessibility;
    /**
     * The parameter parsers of this constructor.
     * @since 1.0.0
     */
    readonly parameters: ParameterParser[];
    constructor(data: ClassConstructorParser.Data);
    /**
     * Whether or not this constructor has a public accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    isPublic(): boolean;
    /**
     * Whether or not this constructor has a protected accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    isProtected(): boolean;
    /**
     * Whether or not this constructor has a private accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    isPrivate(): boolean;
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): ClassConstructorParser.Json;
    /**
     * Generates a new {@link ClassConstructorParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection: JSONOutput.DeclarationReflection, parentId: number): ClassConstructorParser;
    /**
     * Generates a new {@link ClassConstructorParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json: ClassConstructorParser.Json): ClassConstructorParser;
}
export declare namespace ClassConstructorParser {
    interface Data extends Parser.Data {
        /**
         * The comment parser of this constructor.
         * @since 1.0.0
         */
        comment: CommentParser;
        /**
         * The accessibility of this constructor.
         * @since 7.0.0
         */
        accessibility: ClassParser.Accessibility;
        /**
         * The id of the parent class parser.
         * @since 4.0.0
         */
        parentId: number;
        /**
         * The parameter parsers of this constructor.
         * @since 1.0.0
         */
        parameters: ParameterParser[];
    }
    interface Json extends Parser.Json {
        /**
         * The comment parser of this constructor.
         * @since 1.0.0
         */
        comment: CommentParser.Data;
        /**
         * The accessibility of this constructor.
         * @since 7.0.0
         */
        accessibility: ClassParser.Accessibility;
        /**
         * The id of the parent class parser.
         * @since 4.0.0
         */
        parentId: number;
        /**
         * The parameter parsers of this constructor.
         * @since 1.0.0
         */
        parameters: ParameterParser.Json[];
    }
}
//# sourceMappingURL=ClassConstructorParser.d.ts.map