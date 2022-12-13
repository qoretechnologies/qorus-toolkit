import type { ProjectParser } from '../ProjectParser';
import { TypeParser } from './TypeParser';
/**
 * Parses data for a type operator type.
 * @since 1.0.0
 */
export declare class TypeOperatorTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    readonly kind = TypeParser.Kind.TypeOperator;
    /**
     * The operator of this type operator type.
     * @since 1.0.0
     */
    readonly operator: TypeOperatorTypeParser.Operator;
    /**
     * The type of this type operator type.
     * @since 1.0.0
     */
    readonly type: TypeParser;
    constructor(data: TypeOperatorTypeParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): TypeOperatorTypeParser.Json;
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
    static formatToString(options: TypeParser.FormatToStringOptions<TypeOperatorTypeParser>): string;
}
export declare namespace TypeOperatorTypeParser {
    interface Data {
        /**
         * The operator of this type operator type.
         * @since 5.0.0
         */
        operator: Operator;
        /**
         * The type of this type operator type.
         * @since 5.0.0
         */
        type: TypeParser;
    }
    interface Json extends TypeParser.Json {
        kind: TypeParser.Kind.TypeOperator;
        /**
         * The operator of this type operator type.
         * @since 1.0.0
         */
        operator: Operator;
        /**
         * The type of this type operator type in a Json compatible format.
         * @since 1.0.0
         */
        type: TypeParser.Json;
    }
    /**
     * The operators of a type operator type.
     */
    enum Operator {
        KeyOf = "keyof",
        Unique = "unique",
        Readonly = "readonly"
    }
}
//# sourceMappingURL=TypeOperatorTypeParser.d.ts.map