import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import NotFoundJson from '../../assets/not_found.json';
import RenderLottie from '../../components/RenderLottie';
import styles from './notFound.module.scss';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <RenderLottie lottieJson={NotFoundJson} height={400} width={400} />
      <span>The page you requested could not be found...</span>
      <Button onClick={() => navigate('/')}>Go Back</Button>
    </div>
  );
};

export default NotFound;
