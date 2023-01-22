import type { StorybookConfig } from '@storybook/core-common';

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-jest'],
  features: {
    storyStoreV7: true,
    modernInlineRender: true,
  },
  core: {
    builder: {
      name: 'webpack5',
      lazyCompilation: true,
    },
  },
  framework: '@storybook/react',
} as StorybookConfig;
