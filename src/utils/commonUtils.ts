import { IThread } from '../redux/thread/types';

export const localStorageUtil = {
  getItem: (name: string) => JSON.parse(localStorage.getItem(name) as string),

  setItem: (name: string, value: unknown) => localStorage.setItem(name, JSON.stringify(value)),
  removeItem: (name: string) => localStorage.removeItem(name),

  clear: () => localStorage.clear(),
};

export const getInitials = (firstName: string, lastName: string) => {
  return firstName[0]?.toUpperCase() + lastName[0]?.toUpperCase();
};

export const getFullName = (firstName: string, lastName: string) => `${firstName} ${lastName}`;

export const filterThreads = (
  searchText: string,
  selectedCategory: string | undefined,
  threads: IThread[],
): IThread[] => {
  let filteredThreads = [...threads];

  if (searchText && !selectedCategory) {
    //filter by text
    filteredThreads = threads.filter(
      e =>
        e?.title?.toLowerCase()?.includes(searchText) ||
        e?.description?.toLowerCase().includes(searchText),
    );
  } else if (!searchText && selectedCategory) {
    // filter by category
    filteredThreads = threads.filter(e => e.category._id === selectedCategory);
  } else if (searchText && selectedCategory) {
    // filter by text and category
    filteredThreads = threads
      .filter(e => e.category._id === selectedCategory)
      .filter(
        e =>
          e?.title?.toLowerCase()?.includes(searchText) ||
          e?.description?.toLowerCase().includes(searchText),
      );
  }

  return filteredThreads;
};
