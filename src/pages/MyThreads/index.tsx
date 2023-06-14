import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import CategorySelectorAndSearch from '../../components/CategorySelectorAndSearch';
import ThreadsRenderer from '../../components/ThreadsRenderer';
import { selectSearchText, selectSelectedCategory } from '../../redux/common/common.slice';
import { useGetMyThreadsQuery } from '../../redux/thread/thread.service';
import { selectMyThreads } from '../../redux/thread/thread.slice';
import { filterThreads } from '../../utils/commonUtils';
import styles from './myThreads.module.scss';

const MyThreads = () => {
  const { isLoading } = useGetMyThreadsQuery({}, { refetchOnMountOrArgChange: true });
  const myThreads = useSelector(selectMyThreads);

  const searchText = useSelector(selectSearchText);
  const selectedCategory = useSelector(selectSelectedCategory);

  const filteredMyThreads = useMemo(() => {
    if (!myThreads?.length) return [];
    return filterThreads(searchText.toLowerCase(), selectedCategory, myThreads);
  }, [searchText, selectedCategory, myThreads]);

  return (
    <div className={styles.wrapper}>
      <CategorySelectorAndSearch />
      <ThreadsRenderer
        emptyListText='No threads that you have created found...'
        threads={filteredMyThreads}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MyThreads;
