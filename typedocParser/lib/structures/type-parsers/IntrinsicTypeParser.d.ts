import type { ProjectParser } from '../ProjectParser';
import { TypeParser } from './TypeParser';
/**
 * Parses data for an intrinsic type.
 * @since 1.0.0
 */
export declare class IntrinsicTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    readonly kind = TypeParser.Kind.Intrinsic;
    /**
     * The type of this intrinsic type.
     * @since 1.0.0
     */
    readonly type: string;
    constructor(data: IntrinsicTypeParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): IntrinsicTypeParser.Json;
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
    static formatToString(options: TypeParser.FormatToStringOptions<IntrinsicTypeParser>): string;
}
export declare namespace IntrinsicTypeParser {
    interface Data {
        /**
         * The type of this intrinsic type.
         * @since 5.0.0
         */
        type: string;
    }
    interface Json extends TypeParser.Json {
        kind: TypeParser.Kind.Intrinsic;
        /**
         * The type of this intrinsic type.
         * @since 1.0.0
         */
        type: string;
    }
}
//# sourceMappingURL=IntrinsicTypeParser.d.ts.map