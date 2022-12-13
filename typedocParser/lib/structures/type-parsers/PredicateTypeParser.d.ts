import type { ProjectParser } from '../ProjectParser';
import { TypeParser } from './TypeParser';
/**
 * Parses data for a predicate type.
 * @since 1.0.0
 */
export declare class PredicateTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    readonly kind = TypeParser.Kind.Predicate;
    /**
     * Whether this predicate type asserts a value.
     * @since 1.0.0
     */
    readonly asserts: boolean;
    /**
     * The name of this predicate type.
     * @since 1.0.0
     */
    readonly name: string;
    /**
     * The type of this predicate type.
     *
     * If this {@link PredicateTypeParser.asserts} is `false` this will not be `null`
     */
    readonly type: TypeParser | null;
    constructor(data: PredicateTypeParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): PredicateTypeParser.Json;
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
    static formatToString(options: TypeParser.FormatToStringOptions<PredicateTypeParser>): string;
}
export declare namespace PredicateTypeParser {
    interface Data {
        /**
         * Whether this predicate type asserts a value.
         * @since 5.0.0
         */
        asserts: boolean;
        /**
         * The name of this predicate type.
         * @since 5.0.0
         */
        name: string;
        /**
         * The type of this predicate type.
         *
         * If this {@link PredicateTypeParser.asserts} is `false` this will not be `null`
         * @since 5.0.0
         */
        type: TypeParser | null;
    }
    interface Json extends TypeParser.Json {
        kind: TypeParser.Kind.Predicate;
        /**
         * Whether this predicate type asserts a value.
         * @since 1.0.0
         */
        asserts: boolean;
        /**
         * The name of this predicate type.
         * @since 1.0.0
         */
        name: string;
        /**
         * The type of this predicate type in a Json compatible format.
         *
         * If this {@link PredicateTypeParser.asserts} is `false` this will not be `null`
         * @since 1.0.0
         */
        type: TypeParser.Json | null;
    }
}
//# sourceMappingURL=PredicateTypeParser.d.ts.map