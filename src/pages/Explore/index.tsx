import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import CategorySelectorAndSearch from '../../components/CategorySelectorAndSearch';
import ThreadsRenderer from '../../components/ThreadsRenderer';
import { selectSearchText, selectSelectedCategory } from '../../redux/common/common.slice';
import { useGetExploreThreadsQuery } from '../../redux/thread/thread.service';
import { selectExploreThreads } from '../../redux/thread/thread.slice';
import { filterThreads } from '../../utils/commonUtils';
import styles from './explore.module.scss';

const Explore = () => {
  const { isLoading } = useGetExploreThreadsQuery({}, { refetchOnMountOrArgChange: true });

  const searchText = useSelector(selectSearchText);
  const selectedCategory = useSelector(selectSelectedCategory);
  const exploreThreads = useSelector(selectExploreThreads);

  const filteredExploreThreads = useMemo(() => {
    if (!exploreThreads?.length) return [];

    return filterThreads(searchText.toLowerCase(), selectedCategory, exploreThreads);
  }, [searchText, selectedCategory, exploreThreads]);

  return (
    <div className={styles.wrapper}>
      <CategorySelectorAndSearch />
      <ThreadsRenderer
        emptyListText='No threads to explore...'
        threads={filteredExploreThreads}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Explore;
