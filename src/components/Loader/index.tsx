import LoadingJson from '../../assets/loading.json';
import RenderLottie from '../RenderLottie';
import styles from './loader.module.scss';
import { ILoader } from './types';
const Loader = (props: ILoader) => {
  const { loaderText, boxDimensions = 300 } = props;
  return (
    <div className={styles.wrapper}>
      <RenderLottie lottieJson={LoadingJson} height={boxDimensions} width={boxDimensions} />
      <span>{loaderText}</span>
    </div>
  );
};

export default Loader;
