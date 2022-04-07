import { Component, OnInit } from '@angular/core';
import { AdoService } from '../ado.service';
import { Iteration } from '../models/iteration';
import { Team } from '../models/team';
import { WorkItemRelation } from '../models/work-item-relation';

@Component({
  selector: 'app-current-iteration-form',
  templateUrl: './current-iteration-form.component.html',
  styles: [
  ]
})
export class CurrentIterationFormComponent implements OnInit {

  teams: Team[] = [];
  workItemRelations: WorkItemRelation[] = [];
  currentTeamId: string = '';
  currentIteration?: Iteration;
  submitted = false;
  pat = '';

  constructor(private ado: AdoService) { }

  ngOnInit(): void {
    // this.getTeams();
  }

  getTeams(): void {
    this.ado.getAllTeams(this.pat)
      .subscribe(teams => this.teams = teams.value);
  }

  setCurrentIteration(teamId: string): void {
    // console.log(teamId);
    this.ado.getCurrentIteration(this.pat, teamId)
      .subscribe(iteration => {
        this.currentIteration = iteration.value[0];
        console.log('this.currrentIteration = ', this.currentIteration);
      });
  }

  onPatChange(): void {
    this.getTeams();
  }

  onTeamChange(evnt: Event): void {
    this.setCurrentIteration(this.currentTeamId);
  }

  onSubmit(): void {
    // console.log('onSubmit() fired');
    if (this.currentIteration) {
      // console.log('this.currentIteration', this.currentIteration);

      this.ado.getIterationWorkItems(this.pat, this.currentTeamId, this.currentIteration?.id).subscribe(workitems => {
        this.submitted = true;
        this.workItemRelations = workitems.workItemRelations;
        console.log('this.workItemRelations before filter', this.workItemRelations);
        this.workItemRelations = this.workItemRelations.filter((wir: WorkItemRelation, idx: number) => { return wir.rel === null });
        console.log('this.workItemRelations after filter', this.workItemRelations);

      });
    }
  }

}
