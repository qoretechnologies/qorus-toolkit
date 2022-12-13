"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeParser = void 0;
const ArrayTypeParser_1 = require("./ArrayTypeParser");
const ConditionalTypeParser_1 = require("./ConditionalTypeParser");
const IndexedAccessTypeParser_1 = require("./IndexedAccessTypeParser");
const InferredTypeParser_1 = require("./InferredTypeParser");
const IntersectionTypeParser_1 = require("./IntersectionTypeParser");
const IntrinsicTypeParser_1 = require("./IntrinsicTypeParser");
const LiteralTypeParser_1 = require("./LiteralTypeParser");
const MappedTypeParser_1 = require("./MappedTypeParser");
const NamedTupleMemberTypeParser_1 = require("./NamedTupleMemberTypeParser");
const OptionalTypeParser_1 = require("./OptionalTypeParser");
const PredicateTypeParser_1 = require("./PredicateTypeParser");
const QueryTypeParser_1 = require("./QueryTypeParser");
const ReferenceTypeParser_1 = require("./ReferenceTypeParser");
const ReflectionTypeParser_1 = require("./ReflectionTypeParser");
const RestTypeParser_1 = require("./RestTypeParser");
const TemplateLiteralTypeParser_1 = require("./TemplateLiteralTypeParser");
const TupleTypeParser_1 = require("./TupleTypeParser");
const TypeOperatorTypeParser_1 = require("./TypeOperatorTypeParser");
const UnionTypeParser_1 = require("./UnionTypeParser");
const UnknownTypeParser_1 = require("./UnknownTypeParser");
var TypeParser;
(function (TypeParser) {
    /**
     * Generates a new {@link TypeParser} instance from the given data.
     * @since 1.0.0
     * @param type The type to generate the parser from.
     * @returns The generated parser.
     */
    function generateFromTypeDoc(type) {
        switch (type.type) {
            case 'array': {
                const { elementType } = type;
                return new ArrayTypeParser_1.ArrayTypeParser({ type: generateFromTypeDoc(elementType) });
            }
            case 'conditional': {
                const { checkType, extendsType, trueType, falseType } = type;
                return new ConditionalTypeParser_1.ConditionalTypeParser({
                    checkType: generateFromTypeDoc(checkType),
                    extendsType: generateFromTypeDoc(extendsType),
                    trueType: generateFromTypeDoc(trueType),
                    falseType: generateFromTypeDoc(falseType)
                });
            }
            case 'indexedAccess': {
                const { objectType, indexType } = type;
                return new IndexedAccessTypeParser_1.IndexedAccessTypeParser({
                    objectType: generateFromTypeDoc(objectType),
                    indexType: generateFromTypeDoc(indexType)
                });
            }
            case 'inferred': {
                const { name } = type;
                return new InferredTypeParser_1.InferredTypeParser({ type: name });
            }
            case 'intersection': {
                const { types } = type;
                return new IntersectionTypeParser_1.IntersectionTypeParser({ types: types.map((type) => generateFromTypeDoc(type)) });
            }
            case 'intrinsic': {
                const { name } = type;
                return new IntrinsicTypeParser_1.IntrinsicTypeParser({ type: name });
            }
            case 'literal': {
                const { value } = type;
                return new LiteralTypeParser_1.LiteralTypeParser({ value: (typeof value === 'object' && value !== null ? value.value : value)?.toString() ?? 'null' });
            }
            case 'mapped': {
                const { parameter, parameterType, nameType, templateType, optionalModifier, readonlyModifier } = type;
                return new MappedTypeParser_1.MappedTypeParser({
                    parameter,
                    parameterType: generateFromTypeDoc(parameterType),
                    nameType: nameType ? generateFromTypeDoc(nameType) : null,
                    templateType: generateFromTypeDoc(templateType),
                    optional: (optionalModifier ?? null),
                    readonly: (readonlyModifier ?? null)
                });
            }
            case 'named-tuple-member': {
                const { element, isOptional, name } = type;
                return new NamedTupleMemberTypeParser_1.NamedTupleMemberTypeParser({
                    name,
                    type: generateFromTypeDoc(element),
                    optional: isOptional ?? false
                });
            }
            case 'optional': {
                const { elementType } = type;
                return new OptionalTypeParser_1.OptionalTypeParser({ type: generateFromTypeDoc(elementType) });
            }
            case 'predicate': {
                const { asserts, name, targetType } = type;
                return new PredicateTypeParser_1.PredicateTypeParser({
                    asserts,
                    name,
                    type: targetType ? generateFromTypeDoc(targetType) : null
                });
            }
            case 'query': {
                const { queryType } = type;
                return new QueryTypeParser_1.QueryTypeParser({ query: generateFromTypeDoc(queryType) });
            }
            case 'reference': {
                const { id, name, package: _package, qualifiedName, typeArguments = [] } = type;
                return new ReferenceTypeParser_1.ReferenceTypeParser({
                    id: id ?? null,
                    name: qualifiedName ?? name,
                    packageName: _package ?? null,
                    typeArguments: typeArguments.map((type) => generateFromTypeDoc(type))
                });
            }
            case 'reflection': {
                const { declaration } = type;
                return new ReflectionTypeParser_1.ReflectionTypeParser({ reflection: declaration ?? null });
            }
            case 'rest': {
                const { elementType } = type;
                return new RestTypeParser_1.RestTypeParser({ type: generateFromTypeDoc(elementType) });
            }
            case 'template-literal': {
                const { head, tail } = type;
                return new TemplateLiteralTypeParser_1.TemplateLiteralTypeParser({
                    head,
                    tail: tail.map(([type, text]) => ({ type: generateFromTypeDoc(type), text }))
                });
            }
            case 'tuple': {
                const { elements = [] } = type;
                return new TupleTypeParser_1.TupleTypeParser({ types: elements.map((type) => generateFromTypeDoc(type)) });
            }
            case 'typeOperator': {
                const { operator, target } = type;
                return new TypeOperatorTypeParser_1.TypeOperatorTypeParser({
                    operator: operator,
                    type: generateFromTypeDoc(target)
                });
            }
            case 'union': {
                const { types } = type;
                return new UnionTypeParser_1.UnionTypeParser({ types: types.map((type) => generateFromTypeDoc(type)) });
            }
            case 'unknown': {
                const { name } = type;
                return new UnknownTypeParser_1.UnknownTypeParser({ name });
            }
        }
    }
    TypeParser.generateFromTypeDoc = generateFromTypeDoc;
    /**
     * Generates a new {@link TypeParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    function generateFromJson(json) {
        switch (json.kind) {
            case Kind.Array: {
                const { type } = json;
                return new ArrayTypeParser_1.ArrayTypeParser({ type: generateFromJson(type) });
            }
            case Kind.Conditional: {
                const { checkType, extendsType, trueType, falseType } = json;
                return new ConditionalTypeParser_1.ConditionalTypeParser({
                    checkType: generateFromJson(checkType),
                    extendsType: generateFromJson(extendsType),
                    trueType: generateFromJson(trueType),
                    falseType: generateFromJson(falseType)
                });
            }
            case Kind.IndexedAccess: {
                const { objectType, indexType } = json;
                return new IndexedAccessTypeParser_1.IndexedAccessTypeParser({
                    objectType: generateFromJson(objectType),
                    indexType: generateFromJson(indexType)
                });
            }
            case Kind.Inferred: {
                const { type } = json;
                return new InferredTypeParser_1.InferredTypeParser({ type });
            }
            case Kind.Intersection: {
                const { types } = json;
                return new IntersectionTypeParser_1.IntersectionTypeParser({ types: types.map((type) => generateFromJson(type)) });
            }
            case Kind.Intrinsic: {
                const { type } = json;
                return new IntrinsicTypeParser_1.IntrinsicTypeParser({ type });
            }
            case Kind.Literal: {
                const { value } = json;
                return new LiteralTypeParser_1.LiteralTypeParser({ value });
            }
            case Kind.Mapped: {
                const { parameter, parameterType, nameType, templateType, optional, readonly } = json;
                return new MappedTypeParser_1.MappedTypeParser({
                    parameter,
                    parameterType: generateFromJson(parameterType),
                    nameType: nameType ? generateFromJson(nameType) : null,
                    templateType: generateFromJson(templateType),
                    optional,
                    readonly
                });
            }
            case Kind.NamedTupleMember: {
                const { type, optional, name } = json;
                return new NamedTupleMemberTypeParser_1.NamedTupleMemberTypeParser({ name, type: generateFromJson(type), optional });
            }
            case Kind.Optional: {
                const { type } = json;
                return new OptionalTypeParser_1.OptionalTypeParser({ type: generateFromJson(type) });
            }
            case Kind.Predicate: {
                const { asserts, name, type } = json;
                return new PredicateTypeParser_1.PredicateTypeParser({ asserts, name, type: type ? generateFromJson(type) : null });
            }
            case Kind.Query: {
                const { query } = json;
                return new QueryTypeParser_1.QueryTypeParser({ query: generateFromJson(query) });
            }
            case Kind.Reference: {
                const { id, name, packageName, typeArguments } = json;
                return new ReferenceTypeParser_1.ReferenceTypeParser({
                    id,
                    name,
                    packageName: packageName ?? null,
                    typeArguments: typeArguments.map((type) => generateFromJson(type))
                });
            }
            case Kind.Reflection: {
                const { reflection } = json;
                return new ReflectionTypeParser_1.ReflectionTypeParser({ reflection });
            }
            case Kind.Rest: {
                const { type } = json;
                return new RestTypeParser_1.RestTypeParser({ type: generateFromJson(type) });
            }
            case Kind.TemplateLiteral: {
                const { head, tail } = json;
                return new TemplateLiteralTypeParser_1.TemplateLiteralTypeParser({
                    head,
                    tail: tail.map((tail) => ({ type: generateFromJson(tail.type), text: tail.text }))
                });
            }
            case Kind.Tuple: {
                const { types } = json;
                return new TupleTypeParser_1.TupleTypeParser({ types: types.map((type) => generateFromJson(type)) });
            }
            case Kind.TypeOperator: {
                const { operator, type } = json;
                return new TypeOperatorTypeParser_1.TypeOperatorTypeParser({ operator, type: generateFromJson(type) });
            }
            case Kind.Union: {
                const { types } = json;
                return new UnionTypeParser_1.UnionTypeParser({ types: types.map((type) => generateFromJson(type)) });
            }
            case Kind.Unknown: {
                const { name } = json;
                return new UnknownTypeParser_1.UnknownTypeParser({ name });
            }
        }
    }
    TypeParser.generateFromJson = generateFromJson;
    /**
     * Wraps the given type parser depending on it's binding power.
     * @since 1.0.0
     * @param type The type parser to wrap.
     * @param binding The binding power of the type parser.
     * @returns The wrapped type parser.
     */
    function wrap(type, binding) {
        return TypeParser.BindingPowers[type.kind] < binding ? `(${type.toString()})` : type.toString();
    }
    TypeParser.wrap = wrap;
    /**
     * The kind of type parser.
     * @since 1.0.0
     */
    let Kind;
    (function (Kind) {
        Kind["Array"] = "array";
        Kind["Conditional"] = "conditional";
        Kind["IndexedAccess"] = "indexedAccess";
        Kind["Inferred"] = "inferred";
        Kind["Intersection"] = "intersection";
        Kind["Intrinsic"] = "intrinsic";
        Kind["Literal"] = "literal";
        Kind["Mapped"] = "mapped";
        Kind["NamedTupleMember"] = "namedTupleMember";
        Kind["Optional"] = "optional";
        Kind["Predicate"] = "predicate";
        Kind["Query"] = "query";
        Kind["Reference"] = "reference";
        Kind["Reflection"] = "reflection";
        Kind["Rest"] = "rest";
        Kind["TemplateLiteral"] = "templateLiteral";
        Kind["Tuple"] = "tuple";
        Kind["TypeOperator"] = "typeOperator";
        Kind["Union"] = "union";
        Kind["Unknown"] = "unknown";
    })(Kind = TypeParser.Kind || (TypeParser.Kind = {}));
    /**
     * The binding powers of the type parsers.
     * @since 1.0.0
     */
    TypeParser.BindingPowers = {
        [Kind.Array]: 999,
        [Kind.Conditional]: 150,
        [Kind.IndexedAccess]: 999,
        [Kind.Inferred]: 999,
        [Kind.Intersection]: 120,
        [Kind.Intrinsic]: 999,
        [Kind.Literal]: 999,
        [Kind.Mapped]: 999,
        [Kind.NamedTupleMember]: 999,
        [Kind.Optional]: 999,
        [Kind.Predicate]: 999,
        [Kind.Query]: 900,
        [Kind.Reference]: 999,
        [Kind.Reflection]: 999,
        [Kind.Rest]: 999,
        [Kind.TemplateLiteral]: 999,
        [Kind.Tuple]: 999,
        [Kind.TypeOperator]: 900,
        [Kind.Union]: 100,
        [Kind.Unknown]: -1
    };
})(TypeParser = exports.TypeParser || (exports.TypeParser = {}));
//# sourceMappingURL=TypeParser.js.map