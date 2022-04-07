import { Component, Input, OnInit } from '@angular/core';
import { AdoService } from '../ado.service';
import { WorkItem } from '../models/work-item';
import { WorkItemRelation } from '../models/work-item-relation';

@Component({
  selector: 'work-items-display',
  templateUrl: './work-items-display.component.html',
  styles: [`
  th, td {
    padding: 1em;
  }
  `]
})
export class WorkItemsDisplayComponent implements OnInit {
  @Input() pat: string = '';
  @Input() workItemRelations?: WorkItemRelation[];
  workItems: WorkItem[] = [];
  totalEffort = 0;

  constructor(private ado: AdoService) { }

  ngOnInit(): void {
    // console.log(this.workItemRelations);
    this.getWorkItems();
  }

  getWorkItems(): void {
    if (this.pat) {
      this.workItemRelations?.forEach(r => {
        this.ado.getWorkItem(this.pat, r.target.id)
          .subscribe((wi: WorkItem) => {
            console.log(wi);
            this.workItems.push(wi);
            this.totalEffort = this.totalEffort + wi.fields.effort;
          })
      });
    }
    console.log('getWorkItems() fired!')
  }


}
