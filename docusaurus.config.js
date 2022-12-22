// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */


const config = {
  title: 'PrimiHub',
  // tagline: 'PrimiHub are cool',
  url: 'https://docs.primihub.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'primihub', // Usually your GitHub org/user name.
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
          editUrl: 'https://github.com/primihub/primihub-docs/tree/main/',
          editLocalizedFiles: true,
          showLastUpdateTime: true,
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: {
          blogTitle: 'PrimiHub 博客',
          blogDescription: '开源隐私计算社区 PrimiHub 博客!',
          postsPerPage: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        googleAnalytics: {
          trackingID: 'G-KLS723TJR0',
          anonymizeIP: true,
        },
        gtag: {
          trackingID: 'G-KLS723TJR0',
          anonymizeIP: true,
        },
      }),
    ],
  ],
  scripts: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
    {
      src: '/js/modal.js'
    },
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X',
      crossorigin: 'anonymous',
    }
  ],
  clientModules:[
    require.resolve('./static/css/modal.css'),
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'PrimiHub',
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
            label: '快速开始',
          },
          {
            type: 'doc',
            docId: 'advance-usage/start-nodes',
            position: 'left',
            label: '教程',
          },
          {
            type: 'doc',
            docId: 'developer-docs/build',
            position: 'left',
            label: '开发者',
          },
          {
            to: 'blog',
            label: 'Blog',
            position: 'left'
          },
          {
            type: 'doc',
            docId: 'quick-start-platform/quick-start-platform',
            position: 'left',
            label: '🔥在线体验',
          },
          {
            href: 'https://github.com/primihub/primihub',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
          {
            type: 'localeDropdown',
            position: 'right',
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
              {
                label: '成为贡献者',
                href: 'https://github.com/primihub/community',
              },
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
                label: 'Gitee',
                href: 'https://gitee.com/primihub/primihub',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/OpenPrimi',
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
