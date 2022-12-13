import { ProjectParser } from '../../lib/structures/ProjectParser';
export declare function migrateProjectJson(projectJson: Migration.MajorTwo.MinorOne.ProjectJson | Migration.MajorTwo.MinorTwo.ProjectJson | Migration.MajorTwo.MinorThree.ProjectJson | Migration.MajorThree.MinorZero.ProjectJson | Migration.MajorThree.MinorOne.ProjectJson | Migration.MajorThree.MinorTwo.ProjectJson | Migration.MajorFour.MinorZero.ProjectJson | Migration.MajorSix.MinorZero.ProjectJson | Migration.MajorSeven.MinorZero.ProjectJson): ProjectParser.Json | string;
export declare namespace Migration {
    namespace MajorTwo {
        namespace MinorOne {
            interface ProjectJson {
                typeDocJsonParserVersion: string;
                id: number;
                name: string;
                classes: ClassJson[];
                constants: ConstantJson[];
                enums: EnumJson[];
                functions: FunctionJson[];
                interfaces: InterfaceJson[];
                namespaces: NamespaceJson[];
                typeAliases: TypeAliasJson[];
            }
            interface ClassJson extends Parser {
                external: boolean;
                abstract: boolean;
                extendsType: TypeJson | null;
                implementsType: TypeJson[];
                construct: ClassJson.ConstructorJson;
                properties: ClassJson.PropertyJson[];
                methods: ClassJson.MethodJson[];
            }
            namespace ClassJson {
                interface ConstructorJson extends Parser {
                    parameters: Misc.ParameterJson[];
                }
                interface PropertyJson extends Parser {
                    accessibility: Accessibility;
                    abstract: boolean;
                    static: boolean;
                    readonly: boolean;
                    optional: boolean;
                    type: TypeJson;
                }
                interface MethodJson extends Parser {
                    accessibility: Accessibility;
                    abstract: boolean;
                    static: boolean;
                    signatures: Misc.SignatureJson[];
                }
                enum Accessibility {
                    Public = "public",
                    Protected = "protected",
                    Private = "private"
                }
            }
            interface ConstantJson extends Parser {
                external: boolean;
                type: TypeJson;
                value: string;
            }
            interface EnumJson extends Parser {
                external: boolean;
                properties: EnumJson.PropertyJson[];
            }
            namespace EnumJson {
                interface PropertyJson extends Parser {
                    value: string;
                }
            }
            interface FunctionJson extends Parser {
                external: boolean;
                signatures: Misc.SignatureJson[];
            }
            interface InterfaceJson extends Parser {
                external: boolean;
                properties: InterfaceJson.PropertyJson[];
            }
            namespace InterfaceJson {
                interface PropertyJson extends Parser {
                    readonly: boolean;
                    type: TypeJson;
                }
            }
            interface NamespaceJson extends Parser {
                external: boolean;
                classes: ClassJson[];
                constants: ConstantJson[];
                enums: EnumJson[];
                functions: FunctionJson[];
                interfaces: InterfaceJson[];
                namespaces: NamespaceJson[];
                typeAliases: TypeAliasJson[];
            }
            interface TypeAliasJson extends Parser {
                external: boolean;
                typeParameters: Misc.TypeParameterJson[];
                type: TypeJson;
            }
            interface Parser {
                id: number;
                name: string;
                comment: Misc.CommentJson;
                source: Misc.SourceJson | null;
            }
            interface TypeJson {
                kind: TypeJson.Kind;
            }
            namespace TypeJson {
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
            }
            namespace Misc {
                interface CommentJson {
                    description: string | null;
                    blockTags: CommentJson.BlockTag[];
                    modifierTags: string[];
                }
                namespace CommentJson {
                    interface BlockTag {
                        name: string;
                        text: string;
                    }
                }
                interface ParameterJson {
                    id: number;
                    name: string;
                    type: TypeJson;
                    flags: any;
                }
                interface SignatureJson {
                    id: number;
                    name: string;
                    typeParameters: TypeParameterJson[];
                    parameters: ParameterJson[];
                    returnType: TypeJson;
                }
                interface SourceJson {
                    line: number;
                    file: string;
                    path: string;
                }
                interface TypeParameterJson {
                    id: number;
                    name: string;
                    type: TypeJson | null;
                    default: TypeJson | null;
                }
            }
        }
        namespace MinorTwo {
            interface ProjectJson extends MinorOne.ProjectJson {
                version: string | null;
            }
        }
        namespace MinorThree {
            type ProjectJson = MinorTwo.ProjectJson;
            interface ClassJson extends MinorOne.ClassJson {
                methods: ClassJson.MethodJson[];
            }
            namespace ClassJson {
                interface MethodJson extends MinorOne.ClassJson.MethodJson {
                    signatures: Misc.SignatureJson[];
                }
            }
            interface FunctionJson extends MinorOne.FunctionJson {
                signatures: Misc.SignatureJson[];
            }
            namespace Misc {
                interface SignatureJson extends MinorOne.Misc.SignatureJson {
                    comment: MinorOne.Misc.CommentJson;
                }
            }
        }
    }
    namespace MajorThree {
        namespace MinorZero {
            interface ProjectJson extends MajorTwo.MinorThree.ProjectJson {
                readme: string | null;
            }
            interface ClassJson extends MajorTwo.MinorThree.ClassJson {
                source: Misc.SourceJson | null;
            }
            namespace ClassJson {
                interface ConstructorJson extends MajorTwo.MinorOne.ClassJson.ConstructorJson {
                    source: Misc.SourceJson | null;
                }
                interface MethodJson extends MajorTwo.MinorThree.ClassJson.MethodJson {
                    source: Misc.SourceJson | null;
                }
                interface PropertyJson extends MajorTwo.MinorOne.ClassJson.PropertyJson {
                    source: Misc.SourceJson | null;
                }
            }
            interface ConstantJson extends MajorTwo.MinorOne.ConstantJson {
                source: Misc.SourceJson | null;
            }
            interface EnumJson extends MajorTwo.MinorOne.EnumJson {
                source: Misc.SourceJson | null;
            }
            namespace EnumJson {
                interface PropertyJson extends MajorTwo.MinorOne.EnumJson.PropertyJson {
                    source: Misc.SourceJson | null;
                }
            }
            interface FunctionJson extends MajorTwo.MinorThree.FunctionJson {
                source: Misc.SourceJson | null;
            }
            interface InterfaceJson extends MajorTwo.MinorOne.InterfaceJson {
                source: Misc.SourceJson | null;
            }
            namespace InterfaceJson {
                interface PropertyJson extends MajorTwo.MinorOne.InterfaceJson.PropertyJson {
                    source: Misc.SourceJson | null;
                }
            }
            interface NamespaceJson extends MajorTwo.MinorOne.NamespaceJson {
                source: Misc.SourceJson | null;
                classes: ClassJson[];
                constants: ConstantJson[];
                enums: EnumJson[];
                functions: FunctionJson[];
                interfaces: InterfaceJson[];
                namespaces: NamespaceJson[];
                typeAliases: TypeAliasJson[];
            }
            interface TypeAliasJson extends MajorTwo.MinorOne.TypeAliasJson {
                source: Misc.SourceJson | null;
            }
            namespace Misc {
                interface SourceJson extends MajorTwo.MinorOne.Misc.SourceJson {
                    url: string | null;
                }
            }
        }
        namespace MinorOne {
            interface ProjectJson extends MinorZero.ProjectJson {
                interfaces: InterfaceJson[];
            }
            interface InterfaceJson extends MinorZero.InterfaceJson {
                methods: InterfaceJson.MethodJson[];
            }
            namespace InterfaceJson {
                interface MethodJson extends MajorTwo.MinorOne.Parser {
                    signatures: MajorTwo.MinorOne.Misc.SignatureJson[];
                }
            }
        }
        namespace MinorTwo {
            interface ProjectJson extends MinorOne.ProjectJson {
                changelog: string | null;
            }
        }
    }
    namespace MajorFour {
        namespace MinorZero {
            interface ProjectJson extends MajorThree.MinorTwo.ProjectJson {
                classes: ClassJson[];
                enums: EnumJson[];
                interfaces: InterfaceJson[];
            }
            interface ClassJson extends MajorThree.MinorZero.ClassJson {
                construct: ClassJson.ConstructorJson;
                methods: ClassJson.MethodJson[];
                properties: ClassJson.PropertyJson[];
            }
            namespace ClassJson {
                interface ConstructorJson extends MajorThree.MinorZero.ClassJson.ConstructorJson {
                    parentId: number;
                }
                interface MethodJson extends MajorThree.MinorZero.ClassJson.MethodJson {
                    parentId: number;
                }
                interface PropertyJson extends MajorThree.MinorZero.ClassJson.PropertyJson {
                    parentId: number;
                }
            }
            interface EnumJson extends MajorThree.MinorZero.EnumJson {
                properties: EnumJson.PropertyJson[];
            }
            namespace EnumJson {
                interface PropertyJson extends MajorThree.MinorZero.EnumJson.PropertyJson {
                    parentId: number;
                }
            }
            interface InterfaceJson extends MajorThree.MinorOne.InterfaceJson {
                properties: InterfaceJson.PropertyJson[];
                methods: InterfaceJson.MethodJson[];
            }
            namespace InterfaceJson {
                interface PropertyJson extends MajorTwo.MinorOne.InterfaceJson.PropertyJson {
                    parentId: number;
                }
                interface MethodJson extends MajorThree.MinorOne.InterfaceJson.MethodJson {
                    parentId: number;
                }
            }
        }
    }
    namespace MajorSix {
        namespace MinorZero {
            interface ProjectJson extends Omit<MajorFour.MinorZero.ProjectJson, 'classes' | 'constants' | 'enums' | 'interfaces'> {
                classes: ClassJson[];
                enums: EnumJson[];
                interfaces: InterfaceJson[];
                variables: VariableJson[];
            }
            interface ClassJson extends Omit<MajorFour.MinorZero.ClassJson, 'methods'> {
                typeParameters: MajorTwo.MinorOne.Misc.TypeParameterJson[];
                methods: ClassJson.MethodJson[];
            }
            namespace ClassJson {
                interface MethodJson extends Omit<MajorFour.MinorZero.ClassJson.MethodJson, 'comment' | 'signatures'> {
                    signatures: Misc.SignatureJson[];
                }
            }
            interface EnumJson extends Omit<MajorFour.MinorZero.EnumJson, 'properties'> {
                members: EnumJson.MemberJson[];
            }
            namespace EnumJson {
                type MemberJson = MajorFour.MinorZero.EnumJson.PropertyJson;
            }
            interface InterfaceJson extends Omit<MajorFour.MinorZero.InterfaceJson, 'methods'> {
                methods: InterfaceJson.MethodJson[];
            }
            namespace InterfaceJson {
                interface MethodJson extends Omit<MajorFour.MinorZero.InterfaceJson.MethodJson, 'comment'> {
                    signatures: Misc.SignatureJson[];
                }
            }
            interface FunctionJson extends Omit<MajorTwo.MinorThree.FunctionJson, 'signatures'> {
                signatures: Misc.SignatureJson[];
            }
            type VariableJson = MajorThree.MinorZero.ConstantJson;
            interface NamespaceJson extends Omit<MajorThree.MinorZero.NamespaceJson, 'classes' | 'constants' | 'enums' | 'interfaces'> {
                classes: ClassJson[];
                enums: EnumJson[];
                interfaces: InterfaceJson[];
                variables: VariableJson[];
            }
            namespace Misc {
                interface ParameterJson extends MajorTwo.MinorOne.Misc.ParameterJson {
                    comment: MajorTwo.MinorOne.Misc.CommentJson;
                }
                interface SignatureJson extends MajorTwo.MinorOne.Misc.SignatureJson {
                    parameters: ParameterJson[];
                }
            }
        }
    }
    namespace MajorSeven {
        namespace MinorZero {
            interface ProjectJson extends Omit<MajorSix.MinorZero.ProjectJson, 'classes' | 'interfaces' | 'functions'> {
                classes: ClassJson[];
                interfaces: InterfaceJson[];
                functions: FunctionJson[];
            }
            interface ClassJson extends Omit<MajorSix.MinorZero.ClassJson, 'construct' | 'methods'> {
                construct: ClassJson.ConstructorJson;
                methods: ClassJson.MethodJson[];
            }
            namespace ClassJson {
                interface ConstructorJson extends MajorFour.MinorZero.ClassJson.ConstructorJson {
                    accessibility: MajorTwo.MinorOne.ClassJson.Accessibility;
                }
                interface MethodJson extends Omit<MajorSix.MinorZero.ClassJson.MethodJson, 'signatures'> {
                    signatures: Misc.SignatureJson[];
                }
            }
            interface InterfaceJson extends Omit<MajorSix.MinorZero.InterfaceJson, 'methods'> {
                typeParameters: Misc.TypeParameterJson[];
                methods: InterfaceJson.MethodJson[];
            }
            namespace InterfaceJson {
                interface MethodJson extends Omit<MajorSix.MinorZero.InterfaceJson.MethodJson, 'signatures'> {
                    signatures: Misc.SignatureJson[];
                }
            }
            interface FunctionJson extends Omit<MajorThree.MinorZero.FunctionJson, 'signatures'> {
                signatures: Misc.SignatureJson[];
            }
            namespace Misc {
                interface SignatureJson extends Omit<MajorSix.MinorZero.Misc.SignatureJson, 'typeParameters'> {
                    typeParameters: TypeParameterJson[];
                }
                interface TypeParameterJson extends Omit<MajorTwo.MinorOne.Misc.TypeParameterJson, 'type'> {
                    constraint: MajorTwo.MinorOne.TypeJson | null;
                }
            }
        }
    }
}
//# sourceMappingURL=migrateProjectJson.d.ts.map