import type { JSONOutput } from 'typedoc';
import { SignatureParser } from '../misc';
import { Parser } from '../Parser';
import { ClassParser } from './ClassParser';
/**
 * Parses data from a class method reflection.
 * @since 1.0.0
 */
export declare class ClassMethodParser extends Parser {
    /**
     * The id of the parent class parser.
     * @since 4.0.0
     */
    readonly parentId: number;
    /**
     * The accessibility of this method.
     * @since 1.0.0
     */
    readonly accessibility: ClassParser.Accessibility;
    /**
     * Whether this method is abstract.
     * @since 1.0.0
     */
    readonly abstract: boolean;
    /**
     * Whether this method is static.
     * @since 1.0.0
     */
    readonly static: boolean;
    /**
     * The signature parsers of this method.
     * @since 1.0.0
     */
    readonly signatures: SignatureParser[];
    constructor(data: ClassMethodParser.Data);
    /**
     * Whether or not this method has a public accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    isPublic(): boolean;
    /**
     * Whether or not this method has a protected accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    isProtected(): boolean;
    /**
     * Whether or not this method has a private accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    isPrivate(): boolean;
    /**
     * Convert this parser to a JSON compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): ClassMethodParser.Json;
    /**
     * Generates a new {@link ClassMethodParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection: JSONOutput.DeclarationReflection, parentId: number): ClassMethodParser;
    /**
     * Generates a new {@link ClassMethodParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json: ClassMethodParser.Json): ClassMethodParser;
}
export declare namespace ClassMethodParser {
    interface Data extends Parser.Data {
        /**
         * The id of the parent class parser.
         * @since 4.0.0
         */
        parentId: number;
        /**
         * The accessibility of this method.
         * @since 1.0.0
         */
        accessibility: ClassParser.Accessibility;
        /**
         * Whether this method is abstract.
         * @since 1.0.0
         */
        abstract: boolean;
        /**
         * Whether this method is static.
         * @since 1.0.0
         */
        static: boolean;
        /**
         * The signature parsers of this method.
         * @since 1.0.0
         */
        signatures: SignatureParser[];
    }
    interface Json extends Parser.Json {
        /**
         * The id of the parent class parser.
         * @since 4.0.0
         */
        parentId: number;
        /**
         * The accessibility of this method.
         * @since 1.0.0
         */
        accessibility: ClassParser.Accessibility;
        /**
         * Whether this method is abstract.
         * @since 1.0.0
         */
        abstract: boolean;
        /**
         * Whether this method is static.
         * @since 1.0.0
         */
        static: boolean;
        /**
         * The signature parsers of this method in a Json compatible format.
         * @since 1.0.0
         */
        signatures: SignatureParser.Json[];
    }
}
//# sourceMappingURL=ClassMethodParser.d.ts.map