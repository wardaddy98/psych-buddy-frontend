import EmptyContentJson from '../../assets/empty_content.json';
import RenderLottie from '../RenderLottie';
import styles from './emptyValuePlaceholder.module.scss';
import { IEmptyValuePlaceholder } from './types';

const EmptyValuePlaceholder = (props: IEmptyValuePlaceholder) => {
  const { text, style } = props;
  return (
    <div className={styles.wrapper} style={style}>
      <span className={styles.text}>{text}</span>
      <RenderLottie lottieJson={EmptyContentJson} />
    </div>
  );
};

export default EmptyValuePlaceholder;
