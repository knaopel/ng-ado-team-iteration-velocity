import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { IterationResult, Teams, WorkItem, WorkItemAdapter, WorkItemRelationsResult } from './models';
import config from '../environments/config';
import { ProjectProperties, ProjectPropertiesAdapter } from './models/project-properties';
import { ProcessTemplate } from './models/process-template';

@Injectable({
  providedIn: 'root'
})
export class AdoService {
  private baseUrl = `https://dev.azure.com/${config.ORG}`;
  private workItemUrl = `${this.baseUrl}/_apis/wit/workItems/{itemId}`;
  private projectUrl = `${this.baseUrl}/_apis/projects/${config.PROJECT}?api-version=6.0`;
  private projectPropertiesUrl = `${this.baseUrl}/_apis/projects/{0}/properties?version=api-version=6.0-preview.1`;
  private listTeamsUrl = `${this.baseUrl}/_apis/projects/${config.PROJECT}/teams?$mine=true&api-version=6.0`;
  private getIterationUrl = `${this.baseUrl}/${config.PROJECT}/{0}/_apis/work/teamsettings/iterations?$timeframe=current&api-version=6.0`;
  private getIterationWorkItemsUrl = `${this.baseUrl}/${config.PROJECT}/{0}/_apis/work/teamsettings/iterations/{1}/workitems?api-version=6.0-preview.1`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private adapter: WorkItemAdapter,
    private projPropAdapter: ProjectPropertiesAdapter
  ) { }

  private getEncodedPat(pat: string): string {
    return btoa(`:${pat}`);
  }

  private getHttpOptions(pat: string): { headers: HttpHeaders } {
    const encodedPAT = this.getEncodedPat(pat);
    return {
      headers: new HttpHeaders({ 'Authorization': `Basic ${encodedPAT}` })
    }
  }

  getAllTeams(pat: string): Observable<Teams> {
    return this.http.get<Teams>(this.listTeamsUrl, this.getHttpOptions(pat))
      .pipe(
        tap(_ => this.log('fetched teams')),
        catchError(this.handleError<Teams>('getAllTeams', { value: [] }))
      );
  }

  private getProjectId(pat: string): Observable<any> {
    return this.http.get<any>(this.projectUrl, this.getHttpOptions(pat))
      .pipe(
        tap(_ => this.log('fetched projectId')),
        catchError(this.handleError<any>('getProjectId'))
      )
  }

  getProjectProcessTemplate(pat: string): Observable<any> {
    return this.getProjectProperties(pat)
      .pipe(
        switchMap(
          (projectProps: ProjectProperties) => 
            this.http.get<any>(`${this.baseUrl}/_apis/work/processes/${projectProps.processTemplateTypeId}?api-version=7.1-preview.2`, this.getHttpOptions(pat))
            .pipe(
              tap(_ => this.log('fetched process template')),
              catchError(this.handleError<any>('getProjectProcessTemplate'))
            )
          
        )
      )
  }

  getProjectProperties(pat: string): Observable<ProjectProperties> {
    return this.getProjectId(pat)
      .pipe(
        switchMap(
          (project: any) => this.http.get<ProjectProperties>(this.projectPropertiesUrl.replace('{0}', project.id), this.getHttpOptions(pat))
            .pipe(
              tap(_ => this.log('fetched project properties')),
              catchError(this.handleError<ProjectProperties>('getProjectProperties')),
              map((props: any) => this.projPropAdapter.adapt(props)))
        )
      )
  }

  getCurrentIteration(pat: string, teamId: string): Observable<IterationResult> {
    const url = this.getIterationUrl.replace('{0}', teamId);
    return this.http.get<IterationResult>(url, this.getHttpOptions(pat))
      .pipe(
        tap(_ => this.log('fetched iteration')),
        catchError(this.handleError<IterationResult>('getCurrentIteration'))
      );
  }

  getIterationWorkItems(pat: string, teamId: string, iterationId: string): Observable<WorkItemRelationsResult> {
    const url = this.getIterationWorkItemsUrl.replace('{0}', teamId).replace('{1}', iterationId);
    return this.http.get<WorkItemRelationsResult>(url, this.getHttpOptions(pat))
      .pipe(
        tap(_ => this.log('fetched iteration work items')),
        catchError(this.handleError<WorkItemRelationsResult>('getCurrentIteration'))
      );
  }

  getWorkItem(pat: string, itemId: string): Observable<WorkItem> {
    const url = this.workItemUrl.replace('{itemId}', itemId);
    return this.http.get<WorkItem>(url, this.getHttpOptions(pat))
      .pipe(
        map((item: any) => this.adapter.adapt(item)),
        tap(_ => this.log(`fetched workItem: ${itemId}`)),
        catchError(this.handleError<WorkItem>('getWorkItem'))
      );
  }

  /**
   * 
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   * @returns 
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


}
