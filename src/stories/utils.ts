import docs from './docs';
import {
  DocumentationClass,
  DocumentationStory,
  IDocumentationProps,
  InterfaceDocs,
  MethodDocs,
  TypeAliasDocs,
} from './types';

export interface IArgData {
  description?: string;
  name?: string;
  control?: any;
  options?: string[];
  type?: string;
  table?: any;
}

export type TArg<T> = { [key: string]: (IArgData & { defaultValue?: T }) | undefined };
export type TDisabledArg = { [key: string]: { table: { disable: boolean } } };

export const argManager = <Target>() => {
  return {
    createArg<K extends keyof Target>(name: K, data: IArgData & { defaultValue?: Target[K] }): TArg<Target[K]> {
      return {
        [name as string]: data,
      };
    },
    disableArg<K extends keyof Target>(name: K): TDisabledArg {
      return {
        [name]: {
          table: {
            disable: true,
          },
        },
      };
    },
    disableArgs<K extends keyof Target>(names: K[]): TDisabledArg {
      return names.reduce((newArgs: TDisabledArg, name) => {
        return {
          ...newArgs,
          ...{
            [name]: {
              table: {
                disable: true,
              },
            },
          },
        };
      }, {});
    },
  };
};

/* Creating a new instance of the argManager with the type of IDocumentationProps. */
const documentationArgs = argManager<IDocumentationProps>();

export const argsData = {
  ...documentationArgs.disableArgs(['label', 'params', 'returnTypes', 'comments']),
};

export const getAllMethodsFromClass = (className: string) => {
  const methods: MethodDocs[] = [];

  docs.methodDocs.forEach((method) =>
    method.forEach((meth) => {
      if (meth.className === className) {
        methods.push(meth.data);
      }
    }),
  );

  return methods;
};

export const getClassData = (className: string): DocumentationClass => {
  const classDocs: DocumentationClass = docs.classesDocs.find((classDoc) => classDoc.name === className)!;

  classDocs.methods = getAllMethodsFromClass(className);

  return classDocs;
};

export const getMethodData = (methodName: string, className: string) => {
  let selectedMethod;

  docs.methodDocs.forEach((method) =>
    method.forEach((meth) => {
      if (meth.className && meth.data.name) {
        if (meth.className === className && meth.data.name === methodName) {
          selectedMethod = meth;
        }
      }
    }),
  );

  return selectedMethod;
};

export const getInterfaceData = (interfaceName: string): InterfaceDocs | undefined => {
  let selectedInterface: InterfaceDocs = {
    name: '',
  };
  docs.interfaceDocs.forEach((interfaceDoc) => {
    if (interfaceDoc.name === interfaceName) {
      selectedInterface = interfaceDoc;
    }
  });

  return selectedInterface;
};

export const getTypeAliasData = (typeAliasName: string): TypeAliasDocs | undefined => {
  let selectedTypeAlias: TypeAliasDocs = {
    name: '',
  };
  docs.typeAliasDocs.forEach((typeAliasDocs) => {
    if (typeAliasDocs.name === typeAliasName) {
      selectedTypeAlias = typeAliasDocs;
    }
  });

  return selectedTypeAlias;
};

export const getClassPropertyData = (propertyName: string, className: string): TypeAliasDocs | undefined => {
  const classObj = docs.classesDocs.find((classD) => classD.name === className);
  const property = classObj?.properties.find((prop) => prop.name === propertyName);
  return property;
};

export const prepareMethodStory = (template: DocumentationStory, methodName: string, className: string) => {
  const selectedMethod = getMethodData(methodName, className);

  const story = template.bind({});
  const docData: MethodDocs | undefined = selectedMethod?.data;

  story.storyName = methodName;
  story.args = docData;

  return story;
};

export const getTypeOrInterfaceData = (typeOrInterfaceName: string) => {
  const selectedTypeOrInterface = getInterfaceData(typeOrInterfaceName);

  if (selectedTypeOrInterface?.name) {
    return selectedTypeOrInterface;
  }

  return getTypeAliasData(typeOrInterfaceName);
};

export const prepareInterfaceStory = (template: DocumentationStory, interfaceName: string) => {
  const selectedInterface = getInterfaceData(interfaceName);

  const story = template.bind({});
  const docData: InterfaceDocs | undefined = selectedInterface;

  story.storyName = interfaceName;
  story.args = docData;

  return story;
};

export const prepareTypeStory = (template: DocumentationStory, typeAliasName: string) => {
  const selectedTypeAlias = getTypeAliasData(typeAliasName);

  const story = template.bind({});
  const docData: InterfaceDocs | undefined = selectedTypeAlias;

  story.storyName = typeAliasName;
  story.args = docData;

  return story;
};

export const prepareClassPropertyStory = (template: DocumentationStory, propertyName: string, className: string) => {
  const propertyDocs = getClassPropertyData(propertyName, className);

  const story = template.bind({});
  const docData: InterfaceDocs | undefined = propertyDocs;

  story.storyName = propertyName;
  story.args = docData;

  return story;
};

export const newMethodStory = (template: DocumentationStory, className: string) => (methodName: string) => {
  return prepareMethodStory(template, methodName, className);
};

export const newClassPropertyStory = (template: DocumentationStory, className: string) => (propertyName: string) => {
  return prepareClassPropertyStory(template, propertyName, className);
};

export const newTypeAliasStory = (template: DocumentationStory) => (typeAliasName: string) => {
  return prepareTypeStory(template, typeAliasName);
};
export const newInterfaceStory = (template: DocumentationStory) => (interfaceName: string) => {
  return prepareInterfaceStory(template, interfaceName);
};

// Check if a string is starting with a capital letter
export const isCapitalized = (str: string) => {
  // First check if the first letter str is an alphabet letter
  if (!str.charAt(0).match(/[a-z]/i)) {
    return false;
  }

  return str.charAt(0) === str.charAt(0).toUpperCase();
};

// Turn string to Capital case with spaces
export const toCapitalCase = (str?: string) => {
  return str?.replace(/([A-Z])/g, ' $1').replace(/^./, (strNew) => strNew.toUpperCase());
};
