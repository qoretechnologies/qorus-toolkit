import { ReqoreContent, ReqoreLayoutContent, ReqoreUIProvider } from '@qoretechnologies/reqore';
import { withTests } from '@storybook/addon-jest';
import results from '../tests.json';

export const parameters = {
  layout: 'fullscreen',
  options: {
    showPanel: false,
    storySort: {
      order: ['QorusAuthenticator', ['Overview', 'Properties', 'Methods']],
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
    pauseAnimationAtEnd: true,
  },
};

export const argTypes = {};

export const decorators = [
  (Story) => (
    <ReqoreUIProvider theme={{ main: '#111111', intents: { info: '#7f4098' } }}>
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
