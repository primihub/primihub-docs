import React, { useState } from 'react';
import { Widget } from '@happyreact/react';
 
import '@happyreact/react/theme.css';
import styles from './styles.module.css';


const VotedYes = () => {
  return <span>感谢您的反馈，点个 <a href='https://github.com/primihub/primihub'>Star✨</a> 支持一下 PrimiHub 吧！😊</span>;
};
 
const VotedNo = () => {
  return <span>感谢您的反馈，点击 <a href='https://github.com/primihub/primihub/issues/new/choose'>Issue</a> 反馈您的问题吧！😊。</span>;
};
 
export default function Feedback({ resource }) {
  const [reaction, setReaction] = useState(null);
  const isReacted = reaction === '是' || reaction === '否';
  
  const _resource = String(resource).replace(/\//g, '-');
 
  const handleReaction = (params) => {
    setReaction(params.icon);
  };
 

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>此页面是否有帮助？</h3>
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
      ) : reaction === '否' ? (
        <VotedNo />
      ) : (
        <VotedYes />
      )}
    </div>
  );

}