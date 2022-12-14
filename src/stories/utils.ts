import docs from './docs';
import { DocumentationClass, DocumentationStory, IDocumentationProps, MethodDocs } from './types';

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

export const getClassData = (className: string): DocumentationClass => {
  return docs.classesDocs.find((classDoc) => classDoc.name === className)!;
};

export const getMethodData = (methodName: string, className: string) => {
  let selectedMethod;

  console.log(docs.methodDocs);

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

export const prepareStory = (template: DocumentationStory, methodName: string, className: string) => {
  const selectedMethod = getMethodData(methodName, className);

  const story = template.bind({});
  const docData: MethodDocs | undefined = selectedMethod?.data;

  story.storyName = methodName;
  story.args = docData;

  return story;
};

export const newStory = (template: DocumentationStory, className: string) => (methodName: string) => {
  return prepareStory(template, methodName, className);
};
