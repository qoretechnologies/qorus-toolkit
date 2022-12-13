import type { JSONOutput } from 'typedoc';
import type { NamedTupleMemberType } from 'typedoc/dist/lib/serialization/schema';
import type { ProjectParser } from '../ProjectParser';
/**
 * The base interface for all type parsers.
 * @since 1.0.0
 */
export interface TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    kind: TypeParser.Kind;
    /**
     * The method to convert this type parser to a Json compatible format.
     * @since 1.0.0
     */
    toJSON(): TypeParser.Json;
    /**
     * The method to convert this type parser to a string.
     * @param project The optional project parser to use.
     * @since 1.0.0
     */
    toString(project?: ProjectParser): string;
}
export declare namespace TypeParser {
    /**
     * Generates a new {@link TypeParser} instance from the given data.
     * @since 1.0.0
     * @param type The type to generate the parser from.
     * @returns The generated parser.
     */
    function generateFromTypeDoc(type: (JSONOutput.ArrayType | JSONOutput.ConditionalType | JSONOutput.IndexedAccessType | JSONOutput.InferredType | JSONOutput.IntersectionType | JSONOutput.IntrinsicType | JSONOutput.LiteralType | JSONOutput.OptionalType | JSONOutput.PredicateType | JSONOutput.QueryType | JSONOutput.ReferenceType | JSONOutput.ReflectionType | JSONOutput.RestType | JSONOutput.TupleType | JSONOutput.TypeOperatorType | JSONOutput.UnionType | JSONOutput.UnknownType | JSONOutput.MappedType | JSONOutput.TemplateLiteralType | NamedTupleMemberType) | JSONOutput.SomeType): TypeParser;
    /**
     * Generates a new {@link TypeParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    function generateFromJson(json: Json): TypeParser;
    /**
     * Wraps the given type parser depending on it's binding power.
     * @since 1.0.0
     * @param type The type parser to wrap.
     * @param binding The binding power of the type parser.
     * @returns The wrapped type parser.
     */
    function wrap(type: TypeParser, binding: number): string;
    /**
     * The kind of type parser.
     * @since 1.0.0
     */
    enum Kind {
        Array = "array",
        Conditional = "conditional",
        IndexedAccess = "indexedAccess",
        Inferred = "inferred",
        Intersection = "intersection",
        Intrinsic = "intrinsic",
        Literal = "literal",
        Mapped = "mapped",
        NamedTupleMember = "namedTupleMember",
        Optional = "optional",
        Predicate = "predicate",
        Query = "query",
        Reference = "reference",
        Reflection = "reflection",
        Rest = "rest",
        TemplateLiteral = "templateLiteral",
        Tuple = "tuple",
        TypeOperator = "typeOperator",
        Union = "union",
        Unknown = "unknown"
    }
    /**
     * The binding powers of the type parsers.
     * @since 1.0.0
     */
    const BindingPowers: Record<Kind, number>;
    /**
     * The base interface for the Json compatible format of type parsers.
     * @since 1.0.0
     */
    interface Json {
        /**
         * The kind of type parser this is.
         * @since 1.0.0
         */
        kind: Kind;
    }
    /**
     * The options for the static `*TypeParser.formatToString()` methods.
     * @since 7.0.0
     */
    interface FormatToStringOptions<P extends TypeParser> {
        /**
         * The type parser to format.
         * @since 7.0.0
         */
        parser: P;
        /**
         * The project this type parser belongs to.
         * @since 7.0.0
         */
        project?: ProjectParser;
    }
}
//# sourceMappingURL=TypeParser.d.ts.map