import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Translate from '@docusaurus/Translate';

const FeatureList = [
  {
    title: <Translate id="feature-1">隐私计算数据安全</Translate>,
    Svg: require('@site/static/img/24gl-shieldCheck.svg').default,
      description: (
        <Translate id="feature-1-des">
            集成密码学、机器学习技术和加密硬件等多种安全方案，打破数据孤岛，不暴露各参与方敏感数据，实现数据可用不可见，满足安全、合规的需求。
        </Translate>
      ),
  },
  {
    title: <Translate id="feature-2">复杂计算场景需求</Translate>,
    Svg: require('@site/static/img/professional.svg').default,
      description: (
        <Translate id="feature-2-des">
            依托MPC、TEE、FL、DP等数据安全及隐私保护方向领先的安全技术积累，保障联邦计算安全可控。 内置算法丰富，灵活满足复杂计算场景。
        </Translate>
      ),
  },
  {
    title: <Translate id="feature-3">自主高效私有部署</Translate>,
    Svg: require('@site/static/img/efficient.svg').default,
      description: (
        <Translate id="feature-3-des">
            提供一站式端到端的应用服务开发平台，通过可视化交互的方式，实现数据价值的分析与挖掘。采用集群分布式、并发计算、算法优化等策略，实现十亿级规模大数据计算，保障联邦计算稳定高效。
        </Translate>
      ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3 className={styles.desTitle}>{title}</h3>
        <p className={styles.des}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
