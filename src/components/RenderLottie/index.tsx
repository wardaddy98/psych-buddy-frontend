import Lottie from 'react-lottie';
import { IRenderLottie } from './types';

const RenderLottie = (props: IRenderLottie) => {
  const { className, height = 200, lottieJson, width = 200, options = {} } = props;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottieJson,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className={className}>
      <Lottie options={{ ...defaultOptions, ...options }} height={height} width={width} />
    </div>
  );
};

export default RenderLottie;
