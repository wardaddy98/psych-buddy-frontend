import { Spin } from 'antd';
import styles from './cardLoader.module.scss';
import { ICardLoader } from './types';

const CardLoader = (props: ICardLoader) => {
  //By default this component will take up 100% of parent's height and width unless style id provided
  const { wrapperStyle, size = 'small' } = props;
  return (
    <div style={wrapperStyle} className={styles.wrapper}>
      <Spin size={size} />
    </div>
  );
};

export default CardLoader;
