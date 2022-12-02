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
  ...documentationArgs.disableArgs(['label', 'params', 'returns', 'content']),
};

export const prepareStory = (template: DocumentationStory, name: string) => {
  const story = template.bind({});

  // Here we get the documentation data
  // The function needs to be created
  // const docData: DocumentationData = getDocumentationData(name);
  // Hardcoded data for testing
  const fakeHardcodedData = {
    // The name of the method / property / field
    label: 'addEndpoint( addEndpointConfig )',
    // The parameters of the method / property / field
    params: {
      param1: {
        label: 'ParamOne',
        type: 'string',
        description: 'This is a description for an optional parameter',
        optional: true,
      },
      paramTwo: {
        label: 'ParamTwo',
        type: 'ICustomType',
        link: 'somelink',
        description: 'This is a description for a parameter',
      },
    },
    // The return value of the method / property / field
    returns: [{ label: 'Endpoint', link: 'Endpoint' }, { label: 'undefined' }],
    // The description of the method / property / field
    content: 'Adds a new endpoint to the list of available endpoints.',
  };

  story.storyName = name;
  story.args = fakeHardcodedData;

  return story;
};
