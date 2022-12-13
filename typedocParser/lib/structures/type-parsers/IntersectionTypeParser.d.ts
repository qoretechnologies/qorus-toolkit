import type { ProjectParser } from '../ProjectParser';
import { TypeParser } from './TypeParser';
/**
 * Parses data for an intersection type.
 * @since 1.0.0
 */
export declare class IntersectionTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    readonly kind = TypeParser.Kind.Intersection;
    /**
     * The types of this intersection type.
     * @since 1.0.0
     */
    readonly types: TypeParser[];
    constructor(data: IntersectionTypeParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): IntersectionTypeParser.Json;
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
    static formatToString(options: TypeParser.FormatToStringOptions<IntersectionTypeParser>): string;
}
export declare namespace IntersectionTypeParser {
    interface Data {
        /**
         * The types of this intersection type.
         * @since 5.0.0
         */
        types: TypeParser[];
    }
    interface Json extends TypeParser.Json {
        kind: TypeParser.Kind.Intersection;
        /**
         * The types of this intersection type in a Json compatible format.
         * @since 1.0.0
         */
        types: TypeParser.Json[];
    }
}
//# sourceMappingURL=IntersectionTypeParser.d.ts.map