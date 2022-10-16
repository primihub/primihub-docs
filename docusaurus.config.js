// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */


const config = {
  title: 'PrimiHub 使用说明',
  // tagline: 'PrimiHub are cool',
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
            'https://github.com/primihub/primihub-docs/tree/main/',
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'G-KLS723TJR0',
          anonymizeIP: true,
        },
        gtag: {
          trackingID: 'G-KLS723TJR0',
          anonymizeIP: true,
        }
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
          alt: 'PrimiHub Logo',
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
            type: 'doc',
            docId: 'quick-start-platform/quick-start-platform',
            position: 'right',
            label: '快速体验',
          },
          {
            type: 'dropdown',
            label: '源代码',
            position: 'left',
            items: [
              {
                href: 'https://github.com/primihub/primihub',
                label: 'GitHub',
              },
              {
                href: 'https://gitee.com/primihub',
                label: 'Gitee'
              },
              {
                href: 'https://gitcode.net/primihub/primihub',
                label: 'GitCode'
              }
            ],
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://primihub.com/index.html#/scenario',
            label: '解决方案',
            position: 'left',
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
                label: 'Twitter',
                href: 'https://twitter.com/OpenPrimi',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/channel/UCmbSodM232zm_Jod-z4Bv4A/featured',
              },
              {
                label: '关于PrimiHub',
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
        copyright: `<p>Copyright © ${new Date().getFullYear()} PrimiHub Project, Inc. Built with Docusaurus.</p><p>111</p>`,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};


module.exports = config;
