import docsJson from '../../docs/parsedProjectDocumentation.json';
import { MethodDocs } from '../../docs/types';
import { DocumentationStory, IDocumentationProps } from './types';

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

export const getMethodData = (methodName: string, className: string) => {
  let selectedMethod;
  docsJson.methodDocs.map((method) =>
    method.map((meth) => {
      if (meth.className && meth.data.name) {
        if (meth.className === className && meth.data.name === methodName) selectedMethod = meth;
      }
    }),
  );
  if (!selectedMethod) console.log('cant find for', className, methodName);
  else console.log('found', className, methodName);

  selectedMethod.data.returnTypes.reverse();
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

// Here we get the documentation data
// The function needs to be created
// const docData: DocumentationData = getDocumentationData(name);
// Hardcoded data for testing
// const fakeHardcodedData = {
//   // The name of the method / property / field
//   label: 'addEndpoint( addEndpointConfig )',
//   // The parameters of the method / property / field
//   params: {
//     param1: {
//       label: 'ParamOne',
//       type: 'string',
//       description: 'This is a description for an optional parameter',
//       optional: true,
//     },
//     paramTwo: {
//       label: 'ParamTwo',
//       type: 'ICustomType',
//       link: 'somelink',
//       description: 'This is a description for a parameter',
//     },
//   },
//   // The return value of the method / property / field
//   returns: {
//     description: 'This is a description for the return value',
//     types: [{ label: 'Endpoint', link: 'Endpoint' }, { label: 'undefined' }],
//   },
//   // The description of the method / property / field
//   content: 'Adds a new endpoint to the list of available endpoints.',
// };
