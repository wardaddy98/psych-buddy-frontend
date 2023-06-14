import { Button } from 'antd';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategorySelectorAndSearch from '../../components/CategorySelectorAndSearch';
import ThreadCreator from '../../components/ThreadCreator';
import ThreadsRenderer from '../../components/ThreadsRenderer';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { selectSearchText, selectSelectedCategory } from '../../redux/common/common.slice';
import {
  selectShowThreadCreator,
  setShowThreadCreator,
} from '../../redux/mainLayout/mainLayout.slice';
import { useGetHomeThreadsQuery } from '../../redux/thread/thread.service';
import { selectHomeThreads } from '../../redux/thread/thread.slice';
import { filterThreads } from '../../utils/commonUtils';
import styles from './lobby.module.scss';

const Lobby = () => {
  const { isLoading } = useGetHomeThreadsQuery({}, { refetchOnMountOrArgChange: true });
  const { matches: isMobile } = useMediaQuery('(max-width: 800px)');
  const showThreadCreator = useSelector(selectShowThreadCreator);
  const homeThreads = useSelector(selectHomeThreads);
  const dispatch = useDispatch();

  const searchText = useSelector(selectSearchText);
  const selectedCategory = useSelector(selectSelectedCategory);

  const filteredHomeThreads = useMemo(() => {
    if (!homeThreads?.length) return [];

    return filterThreads(searchText.toLowerCase(), selectedCategory, homeThreads);
  }, [searchText, selectedCategory, homeThreads]);

  return (
    <div className={styles.wrapper}>
      {showThreadCreator ? (
        <ThreadCreator />
      ) : (
        <div className={styles.button_wrapper}>
          <Button
            size={isMobile ? 'middle' : 'large'}
            type='primary'
            onClick={() => dispatch(setShowThreadCreator(true))}
          >
            Create Thread
          </Button>
        </div>
      )}

      <CategorySelectorAndSearch />
      <ThreadsRenderer
        emptyListText='No threads that you have interacted with found...'
        threads={filteredHomeThreads}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Lobby;
