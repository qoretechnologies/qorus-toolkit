import type { JSONOutput } from 'typedoc';
import { CommentParser } from '../misc';
import { Parser } from '../Parser';
import { EnumMemberParser } from './EnumMemberParser';
/**
 * Parses data from an enum reflection.
 * @since 1.0.0
 */
export declare class EnumParser extends Parser {
    /**
     * The comment parser of this enum.
     * @since 1.0.0
     */
    readonly comment: CommentParser;
    /**
     * Whether this enum is external.
     * @since 1.0.0
     */
    readonly external: boolean;
    /**
     * The property parsers of this enum.
     * @since 1.0.0
     */
    readonly members: EnumMemberParser[];
    constructor(data: EnumParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): EnumParser.Json;
    /**
     * Generates a new {@link EnumParser} instance from the given Json data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection: JSONOutput.DeclarationReflection): EnumParser;
    /**
     * Generates a new {@link EnumParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json: EnumParser.Json): EnumParser;
}
export declare namespace EnumParser {
    interface Data extends Parser.Data {
        /**
         * The comment parser of this enum.
         * @since 1.0.0
         */
        comment: CommentParser;
        /**
         * Whether this enum is external.
         * @since 1.0.0
         */
        external: boolean;
        /**
         * The property parsers of this enum.
         * @since 1.0.0
         */
        members: EnumMemberParser[];
    }
    interface Json extends Parser.Json {
        /**
         * The comment parser of this enum.
         * @since 1.0.0
         */
        comment: CommentParser.Json;
        /**
         * Whether this enum is external.
         * @since 1.0.0
         */
        external: boolean;
        /**
         * The property parsers of this enum in a Json compatible format.
         */
        members: EnumMemberParser.Json[];
    }
}
//# sourceMappingURL=EnumParser.d.ts.map