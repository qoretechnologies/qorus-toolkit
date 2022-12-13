import type { JSONOutput } from 'typedoc';
import { CommentParser, TypeParameterParser } from '../misc';
import { Parser } from '../Parser';
import { TypeParser } from '../type-parsers';
import { ClassConstructorParser } from './ClassConstructorParser';
import { ClassMethodParser } from './ClassMethodParser';
import { ClassPropertyParser } from './ClassPropertyParser';
/**
 * Parses data from a class reflection.
 * @since 1.0.0
 */
export declare class ClassParser extends Parser {
    /**
     * The comment parser of this class.
     * @since 1.0.0
     */
    readonly comment: CommentParser;
    /**
     * Whether this class is external.
     * @since 1.0.0
     */
    readonly external: boolean;
    /**
     * Whether this class is abstract.
     * @since 1.0.0
     */
    readonly abstract: boolean;
    /**
     * The `extends` type of this class.
     * @since 1.0.0
     */
    readonly extendsType: TypeParser | null;
    /**
     * The `implements` type of this class.
     * @since 1.0.0
     */
    readonly implementsType: TypeParser[];
    /**
     * The type parameter parsers of this class.
     * @since 6.0.0
     */
    readonly typeParameters: TypeParameterParser[];
    /**
     * The constructor parser of this class.
     * @since 1.0.0
     */
    readonly construct: ClassConstructorParser;
    /**
     * The property parsers of this class.
     * @since 1.0.0
     */
    readonly properties: ClassPropertyParser[];
    /**
     * The method parsers of this class.
     * @since 1.0.0
     */
    readonly methods: ClassMethodParser[];
    constructor(data: ClassParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): ClassParser.Json;
    /**
     * Generates a new {@link ClassParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection: JSONOutput.DeclarationReflection): ClassParser;
    /**
     * Generates a new {@link ClassParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json: ClassParser.Json): ClassParser;
}
export declare namespace ClassParser {
    interface Data extends Parser.Data {
        /**
         * The comment parser of this class.
         * @since 1.0.0
         */
        comment: CommentParser;
        /**
         * Whether this class is external.
         * @since 1.0.0
         */
        external: boolean;
        /**
         * Whether this class is abstract.
         * @since 1.0.0
         */
        abstract: boolean;
        /**
         * The `extends` type of this class.
         * @since 1.0.0
         */
        extendsType: TypeParser | null;
        /**
         * The `implements` type of this class.
         * @since 1.0.0
         */
        implementsType: TypeParser[];
        /**
         * The type parameter parsers of this class.
         * @since 6.0.0
         */
        typeParameters: TypeParameterParser[];
        /**
         * The constructor parser of this class.
         * @since 1.0.0
         */
        construct: ClassConstructorParser;
        /**
         * The property parsers of this class.
         * @since 1.0.0
         */
        properties: ClassPropertyParser[];
        /**
         * The method parsers of this class.
         * @since 1.0.0
         */
        methods: ClassMethodParser[];
    }
    interface Json extends Parser.Json {
        /**
         * The comment parser of this class.
         * @since 1.0.0
         */
        comment: CommentParser.Json;
        /**
         * Whether this class is external.
         * @since 1.0.0
         */
        external: boolean;
        /**
         * Whether this class is abstract.
         * @since 1.0.0
         */
        abstract: boolean;
        /**
         * The `extends` type of this class in a Json compatible format.
         * @since 1.0.0
         */
        extendsType: TypeParser.Json | null;
        /**
         * The `implements` type of this class in a Json compatible format.
         * @since 1.0.0
         */
        implementsType: TypeParser.Json[];
        /**
         * The type parameter parsers of this class in a Json compatible format.
         * @since 6.0.0
         */
        typeParameters: TypeParameterParser.Json[];
        /**
         * The constructor parser of this class in a Json compatible format.
         * @since 1.0.0
         */
        construct: ClassConstructorParser.Json;
        /**
         * The property parsers of this class in a Json compatible format.
         * @since 1.0.0
         */
        properties: ClassPropertyParser.Json[];
        /**
         * The method parsers of this class in a Json compatible format.
         * @since 1.0.0
         */
        methods: ClassMethodParser.Json[];
    }
    /**
     * The accessibility types of a class.
     * @since 1.0.0
     */
    enum Accessibility {
        Public = "public",
        Protected = "protected",
        Private = "private"
    }
}
//# sourceMappingURL=ClassParser.d.ts.map