import type { JSONOutput } from 'typedoc';
import { CommentParser, TypeParameterParser } from '../misc';
import { Parser } from '../Parser';
import { InterfaceMethodParser } from './InterfaceMethodParser';
import { InterfacePropertyParser } from './InterfacePropertyParser';
/**
 * Parses data from an interface reflection.
 * @since 1.0.0
 */
export declare class InterfaceParser extends Parser {
    /**
     * The comment parser of this interface.
     * @since 1.0.0
     */
    readonly comment: CommentParser;
    /**
     * Whether this interface is external.
     * @since 1.0.0
     */
    readonly external: boolean;
    /**
     * The type parameters of this interface.
     * @since 7.0.0
     */
    readonly typeParameters: TypeParameterParser[];
    /**
     * The property parsers of this interface.
     * @since 1.0.0
     */
    readonly properties: InterfacePropertyParser[];
    /**
     * The method parsers of this interface.
     * @since 3.1.0
     */
    readonly methods: InterfaceMethodParser[];
    constructor(data: InterfaceParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): InterfaceParser.Json;
    /**
     * Generates a new {@link InterfaceParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection: JSONOutput.DeclarationReflection): InterfaceParser;
    /**
     * Generates a new {@link InterfaceParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json: InterfaceParser.Json): InterfaceParser;
}
export declare namespace InterfaceParser {
    interface Data extends Parser.Data {
        /**
         * The comment parser of this interface.
         * @since 1.0.0
         */
        comment: CommentParser;
        /**
         * Whether this interface is external.
         * @since 1.0.0
         */
        external: boolean;
        /**
         * The type parameters of this interface.
         * @since 7.0.0
         */
        typeParameters: TypeParameterParser[];
        /**
         * The property parsers of this interface.
         * @since 1.0.0
         */
        properties: InterfacePropertyParser[];
        /**
         * The method parsers of this interface.
         * @since 3.1.0
         */
        methods: InterfaceMethodParser[];
    }
    interface Json extends Parser.Json {
        /**
         * The comment parser of this interface.
         * @since 1.0.0
         */
        comment: CommentParser.Json;
        /**
         * Whether this interface is external.
         * @since 1.0.0
         */
        external: boolean;
        /**
         * The type parameters of this interface in a JSON compatible format.
         * @since 7.0.0
         */
        typeParameters: TypeParameterParser.Json[];
        /**
         * The property parsers of this interface in a Json compatible format.
         * @since 1.0.0
         */
        properties: InterfacePropertyParser.Json[];
        /**
         * The method parsers of this interface in a Json compatible format.
         * @since 3.1.0
         */
        methods: InterfaceMethodParser.Json[];
    }
}
//# sourceMappingURL=InterfaceParser.d.ts.map