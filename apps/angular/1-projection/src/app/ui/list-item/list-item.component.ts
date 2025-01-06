import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { Student } from '../../model/student.model';
import { Teacher } from '../../model/teacher.model';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      @if (item) {
        {{ getName() }}
      }

      <button (click)="delete(item.id)">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class ListItemComponent {
  @Input() type!: CardType;
  @Input() item!: City | Student | Teacher;

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
    private citiesStore: CityStore,
  ) {}

  delete(id: number) {
    if (this.type === CardType.TEACHER) {
      this.teacherStore.deleteOne(id);
    } else if (this.type === CardType.STUDENT) {
      this.studentStore.deleteOne(id);
    } else if (this.type === CardType.CITY) {
      this.citiesStore.deleteOne(id);
    }
  }

  public getName(): string {
    if (this.isCity()) {
      const tmp: City = this.item as City;
      return tmp.name;
    } else {
      const tmp: Teacher = this.item as Teacher;
      return tmp.firstName;
    }
  }

  public isCity(): boolean {
    return this.type === CardType.CITY;
  }

  public getCityName(): string {
    const tmp: City = this.item as City;
    return tmp.name;
  }
}
