import type { JSONOutput } from 'typedoc';
import type { ProjectParser } from '../ProjectParser';
import { TypeParser } from './TypeParser';
/**
 * Parses data for a reflection type.
 * @since 1.0.0
 */
export declare class ReflectionTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    readonly kind = TypeParser.Kind.Reflection;
    /**
     * The reflection of this reflection type.
     * @since 1.0.0
     */
    reflection: JSONOutput.DeclarationReflection | null;
    constructor(data: ReflectionTypeParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): ReflectionTypeParser.Json;
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
    static formatToString(options: TypeParser.FormatToStringOptions<ReflectionTypeParser>): string;
}
export declare namespace ReflectionTypeParser {
    interface Data {
        /**
         * The reflection of this reflection type.
         * @since 5.0.0
         */
        reflection: JSONOutput.DeclarationReflection | null;
    }
    interface Json extends TypeParser.Json {
        kind: TypeParser.Kind.Reflection;
        /**
         * The reflection of this reflection type.
         * @since 1.0.0
         */
        reflection: JSONOutput.DeclarationReflection | null;
    }
}
//# sourceMappingURL=ReflectionTypeParser.d.ts.map