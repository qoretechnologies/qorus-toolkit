import type { ProjectParser } from '../ProjectParser';
import { TypeParser } from './TypeParser';
/**
 * Parses data for a named tuple member.
 * @since 1.0.0
 */
export declare class NamedTupleMemberTypeParser implements TypeParser {
    /**
     * The name of this named tuple member.
     * @since 1.0.0
     */
    readonly kind = TypeParser.Kind.NamedTupleMember;
    /**
     * The name of this named tuple member.
     * @since 1.0.0
     */
    readonly name: string;
    /**
     * The type of this named tuple member.
     * @since 1.0.0
     */
    readonly type: TypeParser;
    /**
     * Whether this named tuple member is optional.
     * @since 1.0.0
     */
    readonly optional: boolean;
    constructor(data: NamedTupleMemberTypeParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): NamedTupleMemberTypeParser.Json;
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
    static formatToString(options: TypeParser.FormatToStringOptions<NamedTupleMemberTypeParser>): string;
}
export declare namespace NamedTupleMemberTypeParser {
    interface Data {
        /**
         * The name of this named tuple member.
         * @since 5.0.0
         */
        name: string;
        /**
         * The type of this named tuple member.
         * @since 5.0.0
         */
        type: TypeParser;
        /**
         * Whether this named tuple member is optional.
         * @since 5.0.0
         */
        optional: boolean;
    }
    interface Json extends TypeParser.Json {
        kind: TypeParser.Kind.NamedTupleMember;
        /**
         * The name of this named tuple member.
         * @since 1.0.0
         */
        name: string;
        /**
         * The type of this named tuple member in a Json compatible format.
         * @since 1.0.0
         */
        type: TypeParser.Json;
        /**
         * Whether this named tuple member is optional.
         * @since 1.0.0
         */
        optional: boolean;
    }
}
//# sourceMappingURL=NamedTupleMemberTypeParser.d.ts.map