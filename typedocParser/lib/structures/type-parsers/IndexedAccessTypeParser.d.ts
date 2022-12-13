import type { ProjectParser } from '../ProjectParser';
import { TypeParser } from './TypeParser';
/**
 * Parses data for an indexed access type.
 * @since 1.0.0
 */
export declare class IndexedAccessTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    readonly kind = TypeParser.Kind.IndexedAccess;
    /**
     * The object type of this indexed access type.
     * @since 1.0.0
     */
    readonly objectType: TypeParser;
    /**
     * The index type of this indexed access type.
     * @since 1.0.0
     */
    readonly indexType: TypeParser;
    constructor(data: IndexedAccessTypeParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): IndexedAccessTypeParser.Json;
    /**
     * Converts this parser to a string.
     * @since 1.0.0
     * @returns The string representation of this parser.
     */
    toString(project?: ProjectParser): string;
    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    static formatToString(options: TypeParser.FormatToStringOptions<IndexedAccessTypeParser>): string;
}
export declare namespace IndexedAccessTypeParser {
    interface Data {
        /**
         * The object type of this indexed access type.
         * @since 5.0.0
         */
        objectType: TypeParser;
        /**
         * The index type of this indexed access type.
         * @since 5.0.0
         */
        indexType: TypeParser;
    }
    interface Json extends TypeParser.Json {
        kind: TypeParser.Kind.IndexedAccess;
        /**
         * The object type of this indexed access type in a Json compatible format.
         * @since 1.0.0
         */
        objectType: TypeParser.Json;
        /**
         * The index type of this indexed access type in a Json compatible format.
         * @since 1.0.0
         */
        indexType: TypeParser.Json;
    }
}
//# sourceMappingURL=IndexedAccessTypeParser.d.ts.map