import type { JSONOutput } from 'typedoc';
import { CommentParser } from '../misc';
import { Parser } from '../Parser';
import { TypeParser } from '../type-parsers';
import { ClassParser } from './ClassParser';
/**
 * Parses data from a class property reflection.
 * @since 1.0.0
 */
export declare class ClassPropertyParser extends Parser {
    /**
     * The comment parser of this property.
     * @since 1.0.0
     */
    readonly comment: CommentParser;
    /**
     * The id of the parent class parser.
     * @since 4.0.0
     */
    readonly parentId: number;
    /**
     * The accessibility of this property.
     * @since 1.0.0
     */
    readonly accessibility: ClassParser.Accessibility;
    /**
     * Whether this property is abstract.
     * @since 1.0.0
     */
    readonly abstract: boolean;
    /**
     * Whether this property is static.
     * @since 1.0.0
     */
    readonly static: boolean;
    /**
     * Whether this property is readonly.
     * @since 1.0.0
     */
    readonly readonly: boolean;
    /**
     * Whether this property is optional.
     * @since 1.0.0
     */
    readonly optional: boolean;
    /**
     * The type parser of this property.
     * @since 1.0.0
     */
    readonly type: TypeParser;
    constructor(data: ClassPropertyParser.Data);
    /**
     * Whether or not this property has a public accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    isPublic(): boolean;
    /**
     * Whether or not this property has a protected accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    isProtected(): boolean;
    /**
     * Whether or not this property has a private accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    isPrivate(): boolean;
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): ClassPropertyParser.Json;
    /**
     * Generates a new {@link ClassPropertyParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection: JSONOutput.DeclarationReflection, parentId: number): ClassPropertyParser;
    /**
     * Generates a new {@link ClassPropertyParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json: ClassPropertyParser.Json): ClassPropertyParser;
}
export declare namespace ClassPropertyParser {
    interface Data extends Parser.Data {
        /**
         * The comment parser of this property.
         * @since 1.0.0
         */
        comment: CommentParser;
        /**
         * The id of the parent class parser.
         * @since 4.0.0
         */
        parentId: number;
        /**
         * The accessibility of this property.
         * @since 1.0.0
         */
        accessibility: ClassParser.Accessibility;
        /**
         * Whether this property is abstract.
         * @since 1.0.0
         */
        abstract: boolean;
        /**
         * Whether this property is static.
         * @since 1.0.0
         */
        static: boolean;
        /**
         * Whether this property is readonly.
         * @since 1.0.0
         */
        readonly: boolean;
        /**
         * Whether this property is optional.
         * @since 1.0.0
         */
        optional: boolean;
        /**
         * The type parser of this property.
         * @since 1.0.0
         */
        type: TypeParser;
    }
    interface Json extends Parser.Json {
        /**
         * The comment parser of this property.
         * @since 1.0.0
         */
        comment: CommentParser.Json;
        /**
         * The id of the parent class parser.
         * @since 4.0.0
         */
        parentId: number;
        /**
         * The accessibility of this property.
         * @since 1.0.0
         */
        accessibility: ClassParser.Accessibility;
        /**
         * Whether this property is abstract.
         * @since 1.0.0
         */
        abstract: boolean;
        /**
         * Whether this property is static.
         * @since 1.0.0
         */
        static: boolean;
        /**
         * Whether this property is readonly.
         * @since 1.0.0
         */
        readonly: boolean;
        /**
         * Whether this property is optional.
         * @since 1.0.0
         */
        optional: boolean;
        /**
         * The type parser of this property in a Json compatible format.
         * @since 1.0.0
         */
        type: TypeParser.Json;
    }
}
//# sourceMappingURL=ClassPropertyParser.d.ts.map