import type { JSONOutput } from 'typedoc';
import { CommentParser } from '../misc';
import { Parser } from '../Parser';
import { TypeParser } from '../type-parsers';
/**
 * Parses data from an interface property reflection.
 * @since 1.0.0
 */
export declare class InterfacePropertyParser extends Parser {
    /**
     * The comment parser of this property.
     * @since 1.0.0
     */
    readonly comment: CommentParser;
    /**
     * The id of the parent interface parser.
     * @since 4.0.0
     */
    readonly parentId: number;
    /**
     * Whether this interface property is readonly.
     * @since 1.0.0
     */
    readonly readonly: boolean;
    /**
     * The type of this property.
     * @since 1.0.0
     */
    readonly type: TypeParser;
    constructor(data: InterfacePropertyParser.Data);
    /**
     * Converts this parser to a JSON compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): InterfacePropertyParser.Json;
    /**
     * Generates a new {@link InterfacePropertyParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection: JSONOutput.DeclarationReflection, parentId: number): InterfacePropertyParser;
    /**
     * Generates a new {@link InterfacePropertyParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json: InterfacePropertyParser.Json): InterfacePropertyParser;
}
export declare namespace InterfacePropertyParser {
    interface Data extends Parser.Data {
        /**
         * The comment parser of this property.
         * @since 1.0.0
         */
        comment: CommentParser;
        /**
         * The id of the parent interface parser.
         * @since 4.0.0
         */
        parentId: number;
        /**
         * Whether this interface property is readonly.
         * @since 1.0.0
         */
        readonly: boolean;
        /**
         * The type of this property.
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
         * The id of the parent interface parser.
         * @since 4.0.0
         */
        parentId: number;
        /**
         * Whether this interface property is readonly.
         * @since 1.0.0
         */
        readonly: boolean;
        /**
         * The type of this property in a Json compatible format.
         * @since 1.0.0
         */
        type: TypeParser.Json;
    }
}
//# sourceMappingURL=InterfacePropertyParser.d.ts.map