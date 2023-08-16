import React, { useState } from 'react';
import { Widget } from '@happyreact/react';
 
import '@happyreact/react/theme.css';
import styles from './styles.module.css';
import Translate, { translate } from '@docusaurus/Translate';


const VotedYes = () => {
  return <><Translate id="feedback-vote-yes-1">感谢您的反馈，点个</Translate> <a href='https://github.com/primihub/primihub'>Star✨</a> <Translate id="feedback-vote-yes-2">支持一下 PrimiHub 吧！</Translate>😊</>
};
 
const VotedNo = () => {
  return <><Translate id="feedback-vote-no-1">感谢您的反馈，点击</Translate> <a href='https://github.com/primihub/primihub/issues/new/choose'>Issue</a> <Translate id="feedback-vote-no-2">反馈您的问题吧！</Translate>😊。</>;
};
 
export default function Feedback({ resource }) {
  const [reaction, setReaction] = useState(null);
  const isReacted = reaction === '👍' || reaction === '👎';
  
  const _resource = String(resource).replace(/\//g, '-');
 
  const handleReaction = (params) => {
    setReaction(params.icon);
  };
 

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>{translate({message:'feedback-header'})}</h3>
      {!isReacted ? (
        <div className="">
          <Widget
            token="07349061-4f71-4901-841e-6baa22666385"
            resource={_resource}
            classes={{
              root: styles.widget,
              container: styles.container,
              grid: styles.grid,
              cell: styles.cell,
              reaction: styles.reaction,
            }}
            onReaction={handleReaction}
          />
        </div>
      ) : reaction === '👎' ? (
        <VotedNo />
      ) : (
        <VotedYes />
      )}
    </div>
  );

}