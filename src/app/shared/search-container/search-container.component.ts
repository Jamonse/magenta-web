import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Permission } from 'src/app/auth/model/permission.model';
import { NONE } from 'src/app/auth/util/permission.util';
import { SortEvent } from '../dialog/service/events/sort.event';
import { SearchResult } from '../utils/search.result';
import { SortInterface } from '../utils/sort.interface';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss'],
})
export class SearchContainerComponent implements OnDestroy {
  // Set permission for edit button to appear
  @Input() editPermission: Permission = NONE;
  // Set icon for edit button
  @Input() editButtonIcon: string = 'edit';
  // Set sorting options
  @Input() sortOptions: SortInterface[] = [];
  // Set label of search input
  @Input() searchLabel: string = 'Search...';
  // Search results return from search operation
  @Input() searchResults!: Observable<SearchResult[]>;
  // Sort options label
  @Input() sortOptionsLabel: string = 'Sort by...';
  // Current values
  sortDirection!: boolean;
  sortOption!: string;
  searchText!: string;

  @Output() editEvent: EventEmitter<any> = new EventEmitter();
  @Output() sortEvent: EventEmitter<SortEvent> = new EventEmitter();
  @Output() searchTextEvent: EventEmitter<string> = new EventEmitter();
  @Output() searchClickEvent: EventEmitter<number> = new EventEmitter();

  searchTextForm: FormGroup;
  searchTextFormSubscription: Subscription;

  constructor(private formBuilder: FormBuilder) {
    this.searchTextForm = this.formBuilder.group({
      searchInput: '', // Build form control of search input field
    }); // Listen to search input text changes
    this.searchTextFormSubscription = this.searchTextForm.controls[
      'searchInput'
    ].valueChanges
      .pipe(
        debounceTime(300), // Wait 300ms before tranfering next change
        distinctUntilChanged(), // Wait until an actual change occurred in search text
        tap((text) => {
          // Set search text for highlighting and perofrm search action
          this.searchText = text;
          this.searchTextChanged();
        })
      )
      .subscribe();
  }

  editButtonPressed(): void {
    this.editEvent.emit();
  }

  sortOptionChanged(sortType?: string): void {
    if (sortType) {
      this.sortOption = sortType;
    } else {
      this.sortDirection = !this.sortDirection;
    }
    this.sortEvent.emit({
      sortOption: this.sortOption,
      sortDirection: this.sortDirection,
    });
  }

  searchTextChanged(): void {
    this.searchTextEvent.emit(this.searchText);
  }

  searchOptionClicked(postId: number): void {
    this.searchClickEvent.emit(postId);
  }

  ngOnDestroy(): void {
    if (this.searchTextFormSubscription) {
      this.searchTextFormSubscription.unsubscribe();
    }
  }
}
