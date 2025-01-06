import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  randomCity,
  randStudent,
  randTeacher,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content></ng-content>

      <section>
        <ng-container *ngFor="let item of list">
          <app-list-item [type]="type" [item]="item"></app-list-item>
        </ng-container>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  imports: [ListItemComponent, CommonModule],
})
export class CardComponent {
  @Input() list!: any[];
  @Input() type!: CardType;
  @Input() customClass = '';

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
    private cityStore: CityStore,
  ) {}

  addNewItem() {
    if (this.type === CardType.TEACHER) {
      this.teacherStore.addOne(randTeacher());
    } else if (this.type === CardType.STUDENT) {
      this.studentStore.addOne(randStudent());
    } else if (this.type === CardType.CITY) {
      this.cityStore.addOne(randomCity());
    }
  }
}
