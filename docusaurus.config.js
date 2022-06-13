// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */


const config = {
  title: 'Primihub 使用说明',
  // tagline: 'Primihub are cool',
  url: 'http://docs.primihub.com/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'primihub-docs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-cn',
    locales: ['zh-cn', 'en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '首页',
        logo: {
          alt: 'Primihub Logo',
          src: 'img/logo.png',
          srcDark: 'img/logo-dark.png'
        },
        items: [
          {
            type: 'doc',
            docId: 'quick-start',
            position: 'left',
            label: '文档',
          },
          {
            href: 'https://github.com/primihub/primihub',
            label: 'GitHub',
            position: 'left',
          },
          // {
          //   type: 'localeDropdown',
          //   position: 'right',
          // },
          {
            href: 'https://primihub.com/index.html#scenario',
            label: '解决方案',
            position: 'left'
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '支持与服务',
            items: [
              {
                label: '快速开始',
                to: '/docs/quick-start',
              },
              {
                label: '安装使用',
                to: '/docs/advance-usage/start-nodes',
              },
              {
                label: '常见问题',
                to: '/docs/faq',
              },
              {
                html: `
                <span>联系电话：400-7788-685</span>
                  `,
              },
              {
                html: `
                <span>合作咨询：<a href = "mailto: abc@example.com">business@primihub.com</a></span>
                  `,
              },
            ],
          },
          {
            title: '资源与社区',
            items: [
              // {
              //   label: 'OpenMPC',
              //   href: 'https://www.openmpc.com/',
              // },
              {
                label: '成为贡献者',
                href: 'https://github.com/primihub/primihub',
              },
              // {
              //   html: `
              //   <p>开放隐私计算</p>
              //   <img src="/img/mpc.png" alt="open mpc qrcode" width="80" height="80" />
              //     `,
              // },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/primihub/primihub',
              },
              {
                label: '关于Primihub',
                href: 'https://primihub.com/',
              },
              {
                html: `
                <img src="/img/primihub.png" alt="primihub qrcode" width="80" height="80" style="margin-right: 10px;"/>
                  `,
              },
            ],
          },
        ],
        copyright: `<p>Copyright © ${new Date().getFullYear()} Primihub Project, Inc. Built with Docusaurus.</p><p>111</p>`,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};


module.exports = config;
