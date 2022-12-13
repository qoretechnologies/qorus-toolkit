import type { ProjectParser } from '../ProjectParser';
import { TypeParser } from './TypeParser';
/**
 * Parses data for a template literal type.
 * @since 1.0.0
 */
export declare class TemplateLiteralTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    readonly kind = TypeParser.Kind.TemplateLiteral;
    /**
     * The head of this template literal type.
     * @since 1.0.0
     */
    readonly head: string;
    /**
     * The tail of this template literal type.
     * @since 1.0.0
     */
    readonly tail: TemplateLiteralTypeParser.Tail[];
    constructor(data: TemplateLiteralTypeParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): TemplateLiteralTypeParser.Json;
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
    static formatToString(options: TypeParser.FormatToStringOptions<TemplateLiteralTypeParser>): string;
}
export declare namespace TemplateLiteralTypeParser {
    interface Data {
        /**
         * The head of this template literal type.
         * @since 5.0.0
         */
        head: string;
        /**
         * The tail of this template literal type.
         * @since 5.0.0
         */
        tail: Tail[];
    }
    interface Json extends TypeParser.Json {
        kind: TypeParser.Kind.TemplateLiteral;
        /**
         * The head of this template literal type.
         * @since 1.0.0
         */
        head: string;
        /**
         * The tail of this template literal type.
         * @since 1.0.0
         */
        tail: Tail.Json[];
    }
    interface Tail {
        /**
         * The type of this template literal tail type.
         * @since 1.0.0
         */
        type: TypeParser;
        /**
         * The text of this template literal tail type.
         * @since 1.0.0
         */
        text: string;
    }
    namespace Tail {
        interface Json {
            /**
             * The type of this template literal tail type in a Json compatible format.
             * @since 1.0.0
             */
            type: TypeParser.Json;
            /**
             * The text of this template literal tail type.
             * @since 1.0.0
             */
            text: string;
        }
    }
}
//# sourceMappingURL=TemplateLiteralTypeParser.d.ts.map