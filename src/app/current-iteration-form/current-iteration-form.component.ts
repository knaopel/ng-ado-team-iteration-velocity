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
    this.ado.getCurrentIteration(this.pat, teamId)
      .subscribe(iteration => {
        this.currentIteration = iteration.value[0];
      });
  }

  onPatChange(): void {
    this.getTeams();
  }

  onTeamChange(evnt: Event): void {
    this.setCurrentIteration(this.currentTeamId);
  }

  onSubmit(): void {
    if (this.currentIteration) {

      this.ado.getIterationWorkItems(this.pat, this.currentTeamId, this.currentIteration?.id).subscribe(workitems => {
        this.submitted = true;
        this.workItemRelations = workitems.workItemRelations;
        this.workItemRelations = this.workItemRelations.filter((wir: WorkItemRelation, idx: number) => { return wir.rel === null });
      });
    }
  }

}
