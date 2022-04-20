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
  @Input() sprintName?: string;
  @Input() projectProcessTemplate?: string;
  workItems: WorkItem[] = [];
  totalEffort = 0;

  constructor(private ado: AdoService) { }

  ngOnInit(): void {
    this.getWorkItems();
  }

  getWorkItems(): void {
    if (this.pat) {
      this.workItemRelations?.forEach(r => {
        this.ado.getWorkItem(this.pat, r.target.id)
          .subscribe((wi: WorkItem) => {
            this.workItems.push(wi);
            const effort = this.projectProcessTemplate === 'Agile' ? wi.fields.storyPoints : wi.fields.effort;
            this.totalEffort = this.totalEffort + effort;
          })
      });
    }
  }


}
