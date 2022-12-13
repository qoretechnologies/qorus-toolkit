import type { JSONOutput } from 'typedoc';
import { TypeParser } from '../type-parsers';
/**
 * Parses data from a type parameter reflection.
 * @since 1.0.0
 */
export declare class TypeParameterParser {
    /**
     * The identifier of this parser.
     * @since 1.0.0
     */
    readonly id: number;
    /**
     * The name of this type parameter.
     * @since 1.0.0
     */
    readonly name: string;
    /**
     * The type of this type parameter.
     * @since 1.0.0
     */
    readonly constraint: TypeParser | null;
    /**
     * The default value of this type parameter.
     * @since 1.0.0
     */
    readonly default: TypeParser | null;
    constructor(data: TypeParameterParser.Data);
    /**
     * Converts this type parameter to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this type parameter.
     */
    toJSON(): TypeParameterParser.Json;
    /**
     * Generates a new {@link TypeParameterParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @param project The project this parser belongs to.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection: JSONOutput.TypeParameterReflection): TypeParameterParser;
    /**
     * Generates a new {@link ClassConstructorParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json: TypeParameterParser.Json): TypeParameterParser;
}
export declare namespace TypeParameterParser {
    interface Data {
        /**
         * The identifier of this parser.
         * @since 1.0.0
         */
        id: number;
        /**
         * The name of this type parameter.
         * @since 1.0.0
         */
        name: string;
        /**
         * The constraint of this type parameter.
         * @since 1.0.0
         */
        constraint: TypeParser | null;
        /**
         * The default value of this type parameter.
         * @since 1.0.0
         */
        default: TypeParser | null;
    }
    interface Json {
        /**
         * The identifier of this parser.
         * @since 1.0.0
         */
        id: number;
        /**
         * The name of this type parameter.
         * @since 1.0.0
         */
        name: string;
        /**
         * The constraint of this type parameter in a Json compatible format.
         * @since 1.0.0
         */
        constraint: TypeParser.Json | null;
        /**
         * The default value of this type parameter in a Json compatible format.
         * @since 1.0.0
         */
        default: TypeParser.Json | null;
    }
}
//# sourceMappingURL=TypeParameterParser.d.ts.map