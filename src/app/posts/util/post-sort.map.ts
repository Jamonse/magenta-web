import { SortInterface } from 'src/app/shared/utils/sort.interface';
import { PostSortType } from './posts.util';

export interface PostSortInterface extends SortInterface {
  sortType: PostSortType;
  name: string;
}
