import { ReqoreContent, ReqoreLayoutContent, ReqoreUIProvider } from '@qoretechnologies/reqore';
import { withTests } from '@storybook/addon-jest';
import results from '../tests.json';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
  options: {
    panelPosition: 'right',
    // Hide the panel that shows the addon configurations
    showPanel: false,
    sidebar: {
      showRoots: true,
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    hideNoControlsWarning: true,
    expanded: false,
  },
  chromatic: {
    delay: 500,
  },
};

export const argTypes = {};

export const decorators = [
  (Story, context) => (
    <ReqoreUIProvider theme={{ main: context.args.mainTheme }}>
      <ReqoreLayoutContent>
        <ReqoreContent style={{ padding: '20px' }}>
          <Story />
        </ReqoreContent>
      </ReqoreLayoutContent>
    </ReqoreUIProvider>
  ),
  withTests({
    results,
  }),
];
