import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import CategorySelectorAndSearch from '../../components/CategorySelectorAndSearch';
import ThreadsRenderer from '../../components/ThreadsRenderer';
import { selectSearchText, selectSelectedCategory } from '../../redux/common/common.slice';
import { useGetSavedThreadsQuery } from '../../redux/thread/thread.service';
import { selectSavedThreads } from '../../redux/thread/thread.slice';
import { filterThreads } from '../../utils/commonUtils';
import styles from './savedThreads.module.scss';

const SavedThreads = () => {
  const { isLoading } = useGetSavedThreadsQuery({}, { refetchOnMountOrArgChange: true });

  const searchText = useSelector(selectSearchText);
  const selectedCategory = useSelector(selectSelectedCategory);
  const savedThreads = useSelector(selectSavedThreads);

  const filteredSavedThreads = useMemo(() => {
    if (!savedThreads?.length) return [];

    return filterThreads(searchText.toLowerCase(), selectedCategory, savedThreads);
  }, [searchText, selectedCategory, savedThreads]);

  return (
    <div className={styles.wrapper}>
      <CategorySelectorAndSearch />
      <ThreadsRenderer
        emptyListText='No threads that you have saved found...'
        threads={filteredSavedThreads}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SavedThreads;
