import type { JSONOutput } from 'typedoc';
import { SignatureParser } from '../misc';
import { Parser } from '../Parser';
/**
 * Parses data from an interface method reflection.
 * @since 3.1.0
 */
export declare class InterfaceMethodParser extends Parser {
    /**
     * The id of the parent interface parser.
     * @since 4.0.0
     */
    readonly parentId: number;
    /**
     * The signature parsers of this method.
     * @since 3.1.0
     */
    readonly signatures: SignatureParser[];
    constructor(data: InterfaceMethodParser.Data);
    /**
     * Convert this parser to a Json compatible format.
     * @since 3.1.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): InterfaceMethodParser.Json;
    /**
     * Generates a new {@link InterfaceMethodParser} instance from the given data.
     * @since 3.1.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection: JSONOutput.DeclarationReflection, parentId: number): InterfaceMethodParser;
    /**
     * Generates a new {@link InterfaceMethodParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json: InterfaceMethodParser.Json): InterfaceMethodParser;
}
export declare namespace InterfaceMethodParser {
    interface Data extends Parser.Data {
        /**
         * The id of the parent interface parser.
         * @since 4.0.0
         */
        parentId: number;
        /**
         * The signature parsers of this method.
         * @since 3.1.0
         */
        signatures: SignatureParser[];
    }
    interface Json extends Parser.Json {
        /**
         * The id of the parent interface parser.
         * @since 4.0.0
         */
        parentId: number;
        /**
         * The signature parsers of this method in a Json compatible format.
         * @since 3.1.0
         */
        signatures: SignatureParser.Json[];
    }
}
//# sourceMappingURL=InterfaceMethodParser.d.ts.map