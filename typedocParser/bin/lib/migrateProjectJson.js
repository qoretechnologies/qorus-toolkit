"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration = exports.migrateProjectJson = void 0;
const colorette_1 = require("colorette");
const class_parser_1 = require("../../lib/structures/class-parser");
const ProjectParser_1 = require("../../lib/structures/ProjectParser");
const currentTypeDocJsonParserVersion = ProjectParser_1.ProjectParser.version
    .split('.')
    // eslint-disable-next-line radix
    .map((x) => parseInt(x))
    .slice(0, 3)
    .join('.');
function migrateProjectJson(projectJson) {
    const { typeDocJsonParserVersion, id, name, classes, enums, functions, interfaces, namespaces, typeAliases } = projectJson;
    switch (typeDocJsonParserVersion) {
        case '2.1.0':
        case '2.2.0':
        case '2.2.1':
        case '2.3.0':
        case '2.3.1':
        case '3.0.0':
        case '3.1.0':
        case '3.2.0':
        case '4.0.0':
        case '5.0.0':
        case '5.0.1':
        case '5.1.0':
        case '5.2.0': {
            const { constants } = projectJson;
            return {
                typeDocJsonParserVersion: currentTypeDocJsonParserVersion,
                id,
                name,
                version: 'version' in projectJson ? projectJson.version : null,
                readme: 'readme' in projectJson ? projectJson.readme : null,
                changelog: 'changelog' in projectJson ? projectJson.changelog : null,
                classes: classes.map((classJson) => migrateClassJson(classJson, typeDocJsonParserVersion)),
                enums: enums.map((enumJson) => migrateEnum(enumJson, typeDocJsonParserVersion)),
                functions: functions.map((functionJson) => migrateFunction(functionJson, typeDocJsonParserVersion)),
                interfaces: interfaces.map((interfaceJson) => migrateInterface(interfaceJson, typeDocJsonParserVersion)),
                namespaces: namespaces.map((namespaceJson) => migrateNamespace(namespaceJson, typeDocJsonParserVersion)),
                typeAliases: typeAliases.map((typeAliasJson) => migrateTypeAlias(typeAliasJson, typeDocJsonParserVersion)),
                variables: constants.map((constantJson) => migrateVariable(constantJson, typeDocJsonParserVersion))
            };
        }
        case '6.0.0':
        case '6.0.1':
        case '6.0.2':
        case '7.0.0':
        case '7.0.1':
        case '7.0.2': {
            const { variables } = projectJson;
            return {
                typeDocJsonParserVersion: currentTypeDocJsonParserVersion,
                id,
                name,
                version: 'version' in projectJson ? projectJson.version : null,
                readme: 'readme' in projectJson ? projectJson.readme : null,
                changelog: 'changelog' in projectJson ? projectJson.changelog : null,
                classes: classes.map((classJson) => migrateClassJson(classJson, typeDocJsonParserVersion)),
                enums: enums.map((enumJson) => migrateEnum(enumJson, typeDocJsonParserVersion)),
                functions: functions.map((functionJson) => migrateFunction(functionJson, typeDocJsonParserVersion)),
                interfaces: interfaces.map((interfaceJson) => migrateInterface(interfaceJson, typeDocJsonParserVersion)),
                namespaces: namespaces.map((namespaceJson) => migrateNamespace(namespaceJson, typeDocJsonParserVersion)),
                typeAliases: typeAliases.map((typeAliasJson) => migrateTypeAlias(typeAliasJson, typeDocJsonParserVersion)),
                variables: variables.map((variableJson) => migrateVariable(variableJson, typeDocJsonParserVersion))
            };
        }
    }
    return (0, colorette_1.yellow)(`${(0, colorette_1.bold)(`[WARN]`)} Unsupported typeDocJsonParserVersion(${typeDocJsonParserVersion}) encountered while migrating project ${projectJson.name}${'version' in projectJson ? `@${projectJson.version}` : ''}`);
}
exports.migrateProjectJson = migrateProjectJson;
function migrateClassJson(classJson, typeDocJsonParserVersion) {
    const { id, name, comment, source, external, abstract, extendsType, implementsType, construct, properties, methods } = classJson;
    switch (typeDocJsonParserVersion) {
        case '2.1.0':
        case '2.2.0':
        case '2.2.1':
        case '2.3.0':
        case '2.3.1':
        case '3.0.0':
        case '3.1.0':
        case '3.2.0':
        case '4.0.0':
        case '5.0.0':
        case '5.0.1':
        case '5.1.0':
        case '5.2.0':
            return {
                id,
                name,
                comment,
                source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                external,
                abstract,
                extendsType,
                implementsType,
                typeParameters: [],
                construct: {
                    id: construct.id,
                    name: construct.name,
                    comment: construct.comment,
                    source: construct.source ? migrateSourceJson(construct.source, typeDocJsonParserVersion) : null,
                    parentId: id,
                    accessibility: class_parser_1.ClassParser.Accessibility.Public,
                    parameters: construct.parameters.map((parameterJson) => migrateParameterJson(parameterJson, typeDocJsonParserVersion))
                },
                properties: properties.map((propertyJson) => {
                    const { id, name, comment, source, accessibility, abstract, static: _static, readonly, optional, type } = propertyJson;
                    return {
                        id,
                        name,
                        comment,
                        source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                        parentId: id,
                        accessibility,
                        abstract,
                        static: _static,
                        readonly,
                        optional,
                        type
                    };
                }),
                methods: methods.map((methodJson) => {
                    const { id, name, source, accessibility, abstract, static: _static, signatures } = methodJson;
                    return {
                        id,
                        name,
                        source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                        parentId: id,
                        accessibility,
                        abstract,
                        static: _static,
                        signatures: signatures.map((signatureJson) => migrateSignatureJson(signatureJson, typeDocJsonParserVersion))
                    };
                })
            };
        case '6.0.0':
        case '6.0.1':
        case '6.0.2': {
            const { typeParameters } = classJson;
            return {
                id,
                name,
                comment,
                source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                external,
                abstract,
                extendsType,
                implementsType,
                typeParameters: typeParameters.map((typeParameterJson) => migrateTypeParameterJson(typeParameterJson, typeDocJsonParserVersion)),
                construct: {
                    id: construct.id,
                    name: construct.name,
                    comment: construct.comment,
                    source: construct.source ? migrateSourceJson(construct.source, typeDocJsonParserVersion) : null,
                    parentId: id,
                    accessibility: class_parser_1.ClassParser.Accessibility.Public,
                    parameters: construct.parameters.map((parameterJson) => migrateParameterJson(parameterJson, typeDocJsonParserVersion))
                },
                properties: properties.map((propertyJson) => {
                    const { id, name, comment, source, accessibility, abstract, static: _static, readonly, optional, type } = propertyJson;
                    return {
                        id,
                        name,
                        comment,
                        source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                        parentId: id,
                        accessibility,
                        abstract,
                        static: _static,
                        readonly,
                        optional,
                        type
                    };
                }),
                methods: methods.map((methodJson) => {
                    const { id, name, source, accessibility, abstract, static: _static, signatures } = methodJson;
                    return {
                        id,
                        name,
                        source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                        parentId: id,
                        accessibility,
                        abstract,
                        static: _static,
                        signatures: signatures.map((signatureJson) => migrateSignatureJson(signatureJson, typeDocJsonParserVersion))
                    };
                })
            };
        }
        case '7.0.0':
        case '7.0.1':
        case '7.0.2': {
            const { typeParameters, construct } = classJson;
            return {
                id,
                name,
                comment,
                source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                external,
                abstract,
                extendsType,
                implementsType,
                typeParameters: typeParameters.map((typeParameterJson) => migrateTypeParameterJson(typeParameterJson, typeDocJsonParserVersion)),
                construct: {
                    id: construct.id,
                    name: construct.name,
                    comment: construct.comment,
                    source: construct.source ? migrateSourceJson(construct.source, typeDocJsonParserVersion) : null,
                    parentId: id,
                    accessibility: construct.accessibility,
                    parameters: construct.parameters.map((parameterJson) => migrateParameterJson(parameterJson, typeDocJsonParserVersion))
                },
                properties: properties.map((propertyJson) => {
                    const { id, name, comment, source, accessibility, abstract, static: _static, readonly, optional, type } = propertyJson;
                    return {
                        id,
                        name,
                        comment,
                        source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                        parentId: id,
                        accessibility,
                        abstract,
                        static: _static,
                        readonly,
                        optional,
                        type
                    };
                }),
                methods: methods.map((methodJson) => {
                    const { id, name, source, accessibility, abstract, static: _static, signatures } = methodJson;
                    return {
                        id,
                        name,
                        source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                        parentId: id,
                        accessibility,
                        abstract,
                        static: _static,
                        signatures: signatures.map((signatureJson) => migrateSignatureJson(signatureJson, typeDocJsonParserVersion))
                    };
                })
            };
        }
    }
    throw new Error(`Unsupported typeDocJsonParserVersion: ${typeDocJsonParserVersion}`);
}
function migrateEnum(enumJson, typeDocJsonParserVersion) {
    const { id, name, comment, source, external } = enumJson;
    switch (typeDocJsonParserVersion) {
        case '2.1.0':
        case '2.2.0':
        case '2.2.1':
        case '2.3.0':
        case '2.3.1':
        case '3.0.0':
        case '3.1.0':
        case '3.2.0':
        case '4.0.0':
        case '5.0.0':
        case '5.0.1':
        case '5.1.0':
        case '5.2.0': {
            const { properties } = enumJson;
            return {
                id,
                name,
                comment,
                source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                external,
                members: properties.map((propertyJson) => {
                    const { id, name, comment, source, value } = propertyJson;
                    return {
                        id,
                        name,
                        comment,
                        source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                        parentId: enumJson.id,
                        value
                    };
                })
            };
        }
        case '6.0.0':
        case '6.0.1':
        case '6.0.2':
        case '7.0.0':
        case '7.0.1':
        case '7.0.2': {
            const { members } = enumJson;
            return {
                id,
                name,
                comment,
                source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                external,
                members: members.map((memberJson) => {
                    const { id, name, comment, source, value } = memberJson;
                    return {
                        id,
                        name,
                        comment,
                        source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                        parentId: enumJson.id,
                        value
                    };
                })
            };
        }
    }
    throw new Error(`Unsupported typeDocJsonParserVersion: ${typeDocJsonParserVersion}`);
}
function migrateFunction(functionJson, typeDocJsonParserVersion) {
    const { id, name, comment, source, external, signatures } = functionJson;
    switch (typeDocJsonParserVersion) {
        case '2.1.0':
        case '2.2.0':
        case '2.2.1':
        case '2.3.0':
        case '2.3.1':
        case '3.0.0':
        case '3.1.0':
        case '3.2.0':
        case '4.0.0':
        case '5.0.0':
        case '5.0.1':
        case '5.1.0':
        case '5.2.0':
        case '6.0.0':
        case '6.0.1':
        case '6.0.2':
        case '7.0.0':
        case '7.0.1':
        case '7.0.2':
            return {
                id,
                name,
                comment,
                source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                external,
                signatures: signatures.map((signatureJson) => migrateSignatureJson(signatureJson, typeDocJsonParserVersion))
            };
    }
    throw new Error(`Unsupported typeDocJsonParserVersion: ${typeDocJsonParserVersion}`);
}
function migrateInterface(interfaceJson, typeDocJsonParserVersion) {
    const { id, name, comment, source, external, properties } = interfaceJson;
    switch (typeDocJsonParserVersion) {
        case '2.1.0':
        case '2.2.0':
        case '2.2.1':
        case '2.3.0':
        case '2.3.1':
        case '3.0.0':
            return {
                id,
                name,
                comment,
                source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                external,
                typeParameters: [],
                properties: properties.map((propertyJson) => {
                    const { id, name, comment, source, readonly, type } = propertyJson;
                    return {
                        id,
                        name,
                        comment,
                        source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                        parentId: id,
                        readonly,
                        type
                    };
                }),
                methods: []
            };
        case '3.1.0':
        case '3.2.0':
        case '4.0.0':
        case '5.0.0':
        case '5.0.1':
        case '5.1.0':
        case '5.2.0':
        case '6.0.0':
        case '6.0.1':
        case '6.0.2': {
            const { methods } = interfaceJson;
            return {
                id,
                name,
                comment,
                source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                external,
                typeParameters: [],
                properties: properties.map((propertyJson) => {
                    const { id, name, comment, source, readonly, type } = propertyJson;
                    return {
                        id,
                        name,
                        comment,
                        source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                        parentId: id,
                        readonly,
                        type
                    };
                }),
                methods: methods.map((methodJson) => {
                    const { id, name, source, signatures } = methodJson;
                    return {
                        id,
                        name,
                        source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                        parentId: id,
                        signatures: signatures.map((signatureJson) => migrateSignatureJson(signatureJson, typeDocJsonParserVersion))
                    };
                })
            };
        }
        case '7.0.0':
        case '7.0.1':
        case '7.0.2': {
            const { typeParameters, methods } = interfaceJson;
            return {
                id,
                name,
                comment,
                source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                external,
                typeParameters,
                properties: properties.map((propertyJson) => {
                    const { id, name, comment, source, readonly, type } = propertyJson;
                    return {
                        id,
                        name,
                        comment,
                        source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                        parentId: id,
                        readonly,
                        type
                    };
                }),
                methods: methods.map((methodJson) => {
                    const { id, name, source, signatures } = methodJson;
                    return {
                        id,
                        name,
                        source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                        parentId: id,
                        signatures: signatures.map((signatureJson) => migrateSignatureJson(signatureJson, typeDocJsonParserVersion))
                    };
                })
            };
        }
    }
    throw new Error(`Unsupported typeDocJsonParserVersion: ${typeDocJsonParserVersion}`);
}
function migrateNamespace(namespaceJson, typeDocJsonParserVersion) {
    const { id, name, comment, source, external, classes, enums, functions, interfaces, namespaces, typeAliases } = namespaceJson;
    switch (typeDocJsonParserVersion) {
        case '2.1.0':
        case '2.2.0':
        case '2.2.1':
        case '2.3.0':
        case '2.3.1':
        case '3.0.0':
        case '3.1.0':
        case '3.2.0':
        case '4.0.0':
        case '5.0.0':
        case '5.0.1':
        case '5.1.0':
        case '5.2.0': {
            const { constants } = namespaceJson;
            return {
                id,
                name,
                comment,
                source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                external,
                classes: classes.map((classJson) => migrateClassJson(classJson, typeDocJsonParserVersion)),
                enums: enums.map((enumJson) => migrateEnum(enumJson, typeDocJsonParserVersion)),
                functions: functions.map((functionJson) => migrateFunction(functionJson, typeDocJsonParserVersion)),
                interfaces: interfaces.map((interfaceJson) => migrateInterface(interfaceJson, typeDocJsonParserVersion)),
                namespaces: namespaces.map((namespaceJson) => migrateNamespace(namespaceJson, typeDocJsonParserVersion)),
                typeAliases: typeAliases.map((typeAliasJson) => migrateTypeAlias(typeAliasJson, typeDocJsonParserVersion)),
                variables: constants.map((constantJson) => migrateVariable(constantJson, typeDocJsonParserVersion))
            };
        }
        case '6.0.0':
        case '6.0.1':
        case '6.0.2':
        case '7.0.0':
        case '7.0.1':
        case '7.0.2': {
            const { variables } = namespaceJson;
            return {
                id,
                name,
                comment,
                source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                external,
                classes: classes.map((classJson) => migrateClassJson(classJson, typeDocJsonParserVersion)),
                enums: enums.map((enumJson) => migrateEnum(enumJson, typeDocJsonParserVersion)),
                functions: functions.map((functionJson) => migrateFunction(functionJson, typeDocJsonParserVersion)),
                interfaces: interfaces.map((interfaceJson) => migrateInterface(interfaceJson, typeDocJsonParserVersion)),
                namespaces: namespaces.map((namespaceJson) => migrateNamespace(namespaceJson, typeDocJsonParserVersion)),
                typeAliases: typeAliases.map((typeAliasJson) => migrateTypeAlias(typeAliasJson, typeDocJsonParserVersion)),
                variables: variables.map((variableJson) => migrateVariable(variableJson, typeDocJsonParserVersion))
            };
        }
    }
    throw new Error(`Unsupported typeDocJsonParserVersion: ${typeDocJsonParserVersion}`);
}
function migrateTypeAlias(typeAliasJson, typeDocJsonParserVersion) {
    const { id, name, comment, source, external, typeParameters, type } = typeAliasJson;
    switch (typeDocJsonParserVersion) {
        case '2.1.0':
        case '2.2.0':
        case '2.2.1':
        case '2.3.0':
        case '2.3.1':
        case '3.0.0':
        case '3.1.0':
        case '3.2.0':
        case '4.0.0':
        case '5.0.0':
        case '5.0.1':
        case '5.1.0':
        case '5.2.0':
        case '6.0.0':
        case '6.0.1':
        case '6.0.2':
        case '7.0.0':
        case '7.0.1':
        case '7.0.2':
            return {
                id,
                name,
                comment,
                source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                external,
                typeParameters: typeParameters.map((typeParameterJson) => migrateTypeParameterJson(typeParameterJson, typeDocJsonParserVersion)),
                type
            };
    }
    throw new Error(`Unsupported typeDocJsonParserVersion: ${typeDocJsonParserVersion}`);
}
function migrateVariable(variableJson, typeDocJsonParserVersion) {
    const { id, name, comment, source, external, type, value } = variableJson;
    switch (typeDocJsonParserVersion) {
        case '2.1.0':
        case '2.2.0':
        case '2.2.1':
        case '2.3.0':
        case '2.3.1':
        case '3.0.0':
        case '3.1.0':
        case '3.2.0':
        case '4.0.0':
        case '5.0.0':
        case '5.0.1':
        case '5.1.0':
        case '5.2.0':
        case '6.0.0':
        case '6.0.1':
        case '6.0.2':
        case '7.0.0':
        case '7.0.1':
        case '7.0.2':
            return {
                id,
                name,
                comment,
                source: source ? migrateSourceJson(source, typeDocJsonParserVersion) : null,
                external,
                type,
                value
            };
    }
    throw new Error(`Unsupported typeDocJsonParserVersion: ${typeDocJsonParserVersion}`);
}
function migrateSourceJson(sourceJson, typeDocJsonParserVersion) {
    const { line, file, path } = sourceJson;
    switch (typeDocJsonParserVersion) {
        case '2.1.0':
        case '2.2.0':
        case '2.2.1':
        case '2.3.0':
        case '2.3.1':
            return {
                line,
                file,
                path,
                url: null
            };
        case '3.0.0':
        case '3.1.0':
        case '3.2.0':
        case '4.0.0':
        case '5.0.0':
        case '5.0.1':
        case '5.1.0':
        case '5.2.0':
        case '6.0.0':
        case '6.0.1':
        case '6.0.2':
        case '7.0.0':
        case '7.0.1':
        case '7.0.2': {
            const { url } = sourceJson;
            return {
                line,
                file,
                path,
                url
            };
        }
    }
    throw new Error(`Unsupported typeDocJsonParserVersion: ${typeDocJsonParserVersion}`);
}
function migrateParameterJson(parameterJson, typeDocJsonParserVersion) {
    const { id, name, type, flags } = parameterJson;
    switch (typeDocJsonParserVersion) {
        case '2.1.0':
        case '2.2.0':
        case '2.2.1':
        case '2.3.0':
        case '2.3.1':
        case '3.0.0':
        case '3.1.0':
        case '3.2.0':
        case '4.0.0':
        case '5.0.0':
        case '5.0.1':
        case '5.1.0':
        case '5.2.0':
            return {
                id,
                name,
                comment: {
                    description: null,
                    blockTags: [],
                    modifierTags: []
                },
                type,
                flags
            };
        case '6.0.0':
        case '6.0.1':
        case '6.0.2':
        case '7.0.0':
        case '7.0.1':
        case '7.0.2': {
            const { comment } = parameterJson;
            return {
                id,
                name,
                comment,
                type,
                flags
            };
        }
    }
    throw new Error(`Unsupported typeDocJsonParserVersion: ${typeDocJsonParserVersion}`);
}
function migrateSignatureJson(signatureJson, typeDocJsonParserVersion) {
    const { id, name, typeParameters, parameters, returnType } = signatureJson;
    switch (typeDocJsonParserVersion) {
        case '2.1.0':
        case '2.2.0':
        case '2.2.1':
            return {
                id,
                name,
                comment: { description: null, blockTags: [], modifierTags: [] },
                typeParameters: typeParameters.map((typeParameterJson) => migrateTypeParameterJson(typeParameterJson, typeDocJsonParserVersion)),
                parameters: parameters.map((parameterJson) => migrateParameterJson(parameterJson, typeDocJsonParserVersion)),
                returnType
            };
        case '2.3.0':
        case '2.3.1':
        case '2.3.2':
        case '3.0.0':
        case '3.1.0':
        case '3.2.0':
        case '4.0.0':
        case '5.0.0':
        case '5.0.1':
        case '5.1.0':
        case '5.2.0':
        case '6.0.0':
        case '6.0.1':
        case '6.0.2':
        case '7.0.0':
        case '7.0.1':
        case '7.0.2': {
            const { comment } = signatureJson;
            return {
                id,
                name,
                comment,
                typeParameters: typeParameters.map((typeParameterJson) => migrateTypeParameterJson(typeParameterJson, typeDocJsonParserVersion)),
                parameters: parameters.map((parameterJson) => migrateParameterJson(parameterJson, typeDocJsonParserVersion)),
                returnType
            };
        }
    }
    throw new Error(`Unsupported typeDocJsonParserVersion: ${typeDocJsonParserVersion}`);
}
function migrateTypeParameterJson(typeParameterJson, typeDocJsonParserVersion) {
    const { id, name, default: _default } = typeParameterJson;
    switch (typeDocJsonParserVersion) {
        case '2.1.0':
        case '2.2.0':
        case '2.2.1':
        case '2.3.0':
        case '2.3.1':
        case '3.0.0':
        case '3.1.0':
        case '3.2.0':
        case '4.0.0':
        case '5.0.0':
        case '5.0.1':
        case '5.1.0':
        case '5.2.0':
        case '6.0.0':
        case '6.0.1':
        case '6.0.2': {
            const { type } = typeParameterJson;
            return {
                id,
                name,
                constraint: type,
                default: _default
            };
        }
        case '7.0.0':
        case '7.0.1':
        case '7.0.2': {
            const { constraint } = typeParameterJson;
            return {
                id,
                name,
                constraint,
                default: _default
            };
        }
    }
    throw new Error(`Unsupported typeDocJsonParserVersion: ${typeDocJsonParserVersion}`);
}
var Migration;
(function (Migration) {
    let MajorTwo;
    (function (MajorTwo) {
        let MinorOne;
        (function (MinorOne) {
            let ClassJson;
            (function (ClassJson) {
                let Accessibility;
                (function (Accessibility) {
                    Accessibility["Public"] = "public";
                    Accessibility["Protected"] = "protected";
                    Accessibility["Private"] = "private";
                })(Accessibility = ClassJson.Accessibility || (ClassJson.Accessibility = {}));
            })(ClassJson = MinorOne.ClassJson || (MinorOne.ClassJson = {}));
            let TypeJson;
            (function (TypeJson) {
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
                })(Kind = TypeJson.Kind || (TypeJson.Kind = {}));
            })(TypeJson = MinorOne.TypeJson || (MinorOne.TypeJson = {}));
        })(MinorOne = MajorTwo.MinorOne || (MajorTwo.MinorOne = {}));
    })(MajorTwo = Migration.MajorTwo || (Migration.MajorTwo = {}));
})(Migration = exports.Migration || (exports.Migration = {}));
//# sourceMappingURL=migrateProjectJson.js.map