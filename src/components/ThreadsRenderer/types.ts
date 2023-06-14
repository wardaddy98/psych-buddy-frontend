import { IThread } from '../../redux/thread/types';

export interface IThreadsRenderer {
  threads: Array<IThread>;
  isLoading?: boolean;
  emptyListText: string;
}
