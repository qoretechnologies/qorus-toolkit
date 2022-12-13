"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureParser = void 0;
const types_1 = require("../../types");
const type_parsers_1 = require("../type-parsers");
const CommentParser_1 = require("./CommentParser");
const ParameterParser_1 = require("./ParameterParser");
const TypeParameterParser_1 = require("./TypeParameterParser");
/**
 * Parses data from a signature reflection.
 * @since 1.0.0
 */
class SignatureParser {
    constructor(data) {
        /**
         * The identifier of this parser.
         * @since 1.0.0
         */
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The name of this signature.
         * @since 1.0.0
         */
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The comment parser of this signature.
         * @since 2.3.0
         */
        Object.defineProperty(this, "comment", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The type parameters of this signature.
         * @since 1.0.0
         */
        Object.defineProperty(this, "typeParameters", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The parameters of this signature.
         * @since 1.0.0
         */
        Object.defineProperty(this, "parameters", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The return type of this signature.
         * @since 1.0.0
         */
        Object.defineProperty(this, "returnType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { id, name, comment, typeParameters, parameters, returnType } = data;
        this.id = id;
        this.name = name;
        this.comment = comment;
        this.typeParameters = typeParameters;
        this.parameters = parameters;
        this.returnType = returnType;
    }
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            comment: this.comment.toJSON(),
            typeParameters: this.typeParameters.map((typeParameter) => typeParameter.toJSON()),
            parameters: this.parameters.map((parameter) => parameter.toJSON()),
            returnType: this.returnType.toJSON()
        };
    }
    /**
     * Generates a new {@link SignatureParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection) {
        const { kind, kindString = 'Unknown', id, name, comment = { summary: [] }, typeParameter: typeParameters = [], parameters = [], type } = reflection;
        if (kind !== types_1.ReflectionKind.CallSignature) {
            throw new Error(`Expected Call Signature (${types_1.ReflectionKind.CallSignature}), but received ${kindString} (${kind})`);
        }
        return new SignatureParser({
            id,
            name,
            comment: CommentParser_1.CommentParser.generateFromTypeDoc(comment),
            typeParameters: typeParameters.map((typeParameter) => TypeParameterParser_1.TypeParameterParser.generateFromTypeDoc(typeParameter)),
            parameters: parameters.map((parameter) => ParameterParser_1.ParameterParser.generateFromTypeDoc(parameter)),
            returnType: type_parsers_1.TypeParser.generateFromTypeDoc(type)
        });
    }
    /**
     * Generates a new {@link ClassConstructorParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json) {
        const { id, name, comment, typeParameters, parameters, returnType } = json;
        return new SignatureParser({
            id,
            name,
            comment: CommentParser_1.CommentParser.generateFromJson(comment),
            typeParameters: typeParameters.map((typeParameter) => TypeParameterParser_1.TypeParameterParser.generateFromJson(typeParameter)),
            parameters: parameters.map((parameter) => ParameterParser_1.ParameterParser.generateFromJson(parameter)),
            returnType: type_parsers_1.TypeParser.generateFromJson(returnType)
        });
    }
}
exports.SignatureParser = SignatureParser;
//# sourceMappingURL=SignatureParser.js.map