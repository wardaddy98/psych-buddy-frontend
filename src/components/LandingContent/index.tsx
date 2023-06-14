import { useMediaQuery } from '../../hooks/useMediaQuery';
import RenderLottie from '../RenderLottie';
import styles from './landingContent.module.scss';
import { ILandingContent } from './types';

const LandingContent = (props: ILandingContent) => {
  const { headingText, info, lottieJson, invert = false } = props;
  const { matches: isMobile } = useMediaQuery('(max-width: 800px)');

  return (
    <div className={styles.wrapper}>
      <div className={styles.lottie_wrapper} style={invert && !isMobile ? { order: 2 } : { order: 1 }}>
        <RenderLottie
          lottieJson={lottieJson}
          height={isMobile ? 200 : 400}
          width={isMobile ? 200 : 400}
        />
      </div>

      <div className={styles.text_wrapper} style={invert && !isMobile ? { order: 1 } : { order: 2 }}>
        <span className={styles.heading}>{headingText}</span>
        <p className={styles.info}>{info}</p>
      </div>
    </div>
  );
};

export default LandingContent;
