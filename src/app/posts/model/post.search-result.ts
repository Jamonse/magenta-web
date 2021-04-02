import { SearchResult } from 'src/app/shared/utils/search.result';

export class PostSearchResult implements SearchResult {
  constructor(
    public id: number,
    public title: string,
    public createdAt: Date
  ) {}

  getId(): number {
    return this.id;
  }
  getSearchText(): string {
    return this.title;
  }
}
