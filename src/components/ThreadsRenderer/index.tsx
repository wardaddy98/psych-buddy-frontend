import EmptyValuePlaceholder from '../EmptyValuePlaceholder';
import Loader from '../Loader';
import ThreadCard from '../ThreadCard';
import styles from './threadsRenderer.module.scss';
import { IThreadsRenderer } from './types';

const ThreadsRenderer = (props: IThreadsRenderer) => {
  const { threads = [], isLoading = false, emptyListText } = props;
  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Loader boxDimensions={100} />
      ) : threads && threads?.length ? (
        threads.map(thread => <ThreadCard key={thread._id} thread={thread} />)
      ) : (
        <EmptyValuePlaceholder style={{ marginTop: '4rem' }} text={emptyListText} />
      )}
    </div>
  );
};

export default ThreadsRenderer;
