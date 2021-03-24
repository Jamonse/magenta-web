import { PostSortInterface } from './post-sort.map';

export type PostSortType = 'title' | 'createdAt' | 'lastUpdated' | 'createdBy';
export const POST_SORT_TYPES: PostSortInterface[] = [
  { sortType: 'title', name: 'Title' },
  { sortType: 'createdAt', name: 'Creation Time' },
  { sortType: 'lastUpdated', name: 'Last Updated' },
  { sortType: 'createdBy', name: 'Creator' },
];
export const POST_INITIAL_SORT_TYPE: PostSortType = 'createdAt';
