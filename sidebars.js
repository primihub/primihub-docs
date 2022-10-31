/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'quick-start',
      label: 'quick-start',
    },
    {
      type: 'category',
      label: 'quick-start-platform',
      items: [
        'quick-start-platform/online-service',
        'quick-start-platform/resource',
        'quick-start-platform/project',
        'quick-start-platform/pir',
        'quick-start-platform/psi'
      ],
    },
    {
      type: 'category',
      label: 'core-concept',
      items: [
        'core-concept/model',
        'core-concept/scalability'
      ],
    },
    {
      type: 'category',
      label: 'advance-usage',
      items: [
        'advance-usage/start-nodes',
        'advance-usage/connect-datasource',
        'advance-usage/connect-bootstrap-nodes',
        {
          type: 'category',
          label: 'create-tasks',
          items: [
            'advance-usage/create-tasks/cli-params',
            'advance-usage/create-tasks/mpc-task',
            'advance-usage/create-tasks/tee-task',
            'advance-usage/create-tasks/FL-task',
            'advance-usage/create-tasks/psi-task',
            'advance-usage/create-tasks/pir-task'
          ]
        },
        {
          type: 'category',
          label: 'security-protocol',
          items: [
            'advance-usage/security-protocol/aby3',
            'advance-usage/security-protocol/falcon',
            'advance-usage/security-protocol/pailler'
          ]
        },
        {
          type: 'category',
          label: 'federated-learning',
          items: [
            'advance-usage/federated-learning/xgb'
          ]
        },
        {
          type: 'category',
          label: 'python-sdk',
          items: [
            'advance-usage/python-sdk/install',
            'advance-usage/python-sdk/usage'
          ]
        }
      ],
    },
    {
      type: 'category',
      label: 'developer-docs',
      items: [
        'developer-docs/build',
        'developer-docs/protocol-dev-guide',
        {
          type: 'category',
          label: 'deployment',
          items: [
            'developer-docs/deployment/docker-compose-deployment'
          ]
        },
        {
          type: 'category',
          label: 'platform',
          items: [
            'developer-docs/privacy-platform/privacy-platform',
            'developer-docs/privacy-platform/privacy-platform-fusion',
            'developer-docs/privacy-platform/privacy-platform-service',
            'developer-docs/privacy-platform/privacy-platform-webconsole'
          ]
        }
      ],
    },
    {
      type: 'doc',
      id: 'faq',
      label: 'faq',
    },
    {
      type: 'doc',
      id: 'primihub-community',
      label: 'community',
    },
    {
      type: 'doc',
      id: 'contact-us',
      label: 'contact',
    },
  ],
};

module.exports = sidebars;
