import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Permission } from 'src/app/auth/model/permission.model';
import { NONE } from 'src/app/auth/util/permission.util';
import { SortEvent } from '../events/sort.event';
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
  @Input() searchResults: string[] = [];
  // Sort options label
  @Input() sortOptionsLabel: string = 'Sort by...';
  // Current values
  sortDirection!: boolean;
  sortOption!: string;
  searchText!: string;

  @Output() editEvent: EventEmitter<any> = new EventEmitter();
  @Output() sortEvent: EventEmitter<SortEvent> = new EventEmitter();
  @Output() searchTextEvent: EventEmitter<string> = new EventEmitter();

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
        switchMap((text) => `${text}`) // Subscribe only to latest change and discard older ones
      ) // Set search text for highlight matching and emmit change event
      .subscribe((text: string) => {
        this.searchText = text;
        this.searchTextChanged();
      });
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

  ngOnDestroy(): void {
    if (this.searchTextFormSubscription) {
      this.searchTextFormSubscription.unsubscribe();
    }
  }
}
