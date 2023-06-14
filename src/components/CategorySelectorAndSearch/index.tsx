import { Button, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import {
  selectCategories,
  selectSearchText,
  selectSelectedCategory,
  setSearchText,
  setSelectedCategory,
} from '../../redux/common/common.slice';
import { ICategory } from '../../redux/common/types';
import styles from './categorySelectorAndSearch.module.scss';

const CategorySelectorAndSearch = () => {
  const { matches: isMobile } = useMediaQuery('(max-width: 800px');
  const categories = useSelector(selectCategories);
  const selectedCategory = useSelector(selectSelectedCategory);
  const searchText = useSelector(selectSearchText);
  const dispatch = useDispatch();

  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      clearCategory();
      clearSearchText();
    };
  }, []);

  const handleSelectChange = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const clearCategory = () => {
    dispatch(setSelectedCategory(undefined));
  };

  const clearSearchText = () => {
    dispatch(setSearchText(''));
  };

  const handleSearchChange = (e: any) => {
    dispatch(setSearchText(e.target.value));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.category_wrapper}>
        <span className={styles.main_label}>Categories : </span>

        {isMobile ? (
          <>
            <Select
              style={{ minWidth: '100px', maxWidth: '190px' }}
              options={categories}
              onChange={handleSelectChange}
              value={selectedCategory}
            />
            {selectedCategory !== undefined && (
              <Button
                onClick={clearCategory}
                type='default'
                icon={<i className='ri-close-line'></i>}
              />
            )}
          </>
        ) : (
          <div className={styles.tags_wrapper}>
            {categories && showAll
              ? categories?.map(category => (
                  <CheckableTag
                    checked={selectedCategory === category.value}
                    key={category._id}
                    category={category}
                  />
                ))
              : [...categories.slice(0, 10)]?.map(category => (
                  <CheckableTag
                    checked={selectedCategory === category.value}
                    key={category._id}
                    category={category}
                  />
                ))}
            {categories?.length > 10 && (
              <Button size='small' type='link' onClick={() => setShowAll(prev => !prev)}>
                {showAll ? 'Show less...' : 'Show all...'}
              </Button>
            )}
            {selectedCategory !== undefined && <ClearFilterTag />}
          </div>
        )}
      </div>

      <div className={styles.search_wrapper}>
        <Input
          placeholder='Search Threads...'
          value={searchText}
          onChange={handleSearchChange}
          allowClear
        />
      </div>
    </div>
  );
};

interface ICheckableTag {
  category: ICategory;
  checked: boolean;
}

const CheckableTag = (props: ICheckableTag) => {
  const { checked, category } = props;
  const dispatch = useDispatch();

  const onClick = () => {
    if (checked) {
      dispatch(setSelectedCategory(undefined));
    } else {
      dispatch(setSelectedCategory(category.value));
    }
  };
  return (
    <div
      className={`${checked ? styles.checkable_tag : styles.checkable_tag_with_hover} ${
        checked ? styles.checked : ''
      }`}
    >
      <span className={styles.label} onClick={onClick}>
        {category.label}
      </span>
    </div>
  );
};

const ClearFilterTag = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setSelectedCategory(undefined));
  };

  return (
    <div className={styles.clear_filter_tag} onClick={onClick}>
      <span className={styles.label}>
        Clear Filter &nbsp;
        <i className='ri-close-line'></i>
      </span>
    </div>
  );
};

export default CategorySelectorAndSearch;
