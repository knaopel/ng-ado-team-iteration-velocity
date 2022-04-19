import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { IterationResult, Teams, WorkItem, WorkItemAdapter, WorkItemRelationsResult } from './models';
import config from '../environments/config';

@Injectable({
  providedIn: 'root'
})
export class AdoService {
  private baseUrl = `https://dev.azure.com/${config.ORG}`
  private workItemUrl = `${this.baseUrl}/_apis/wit/workItems/{itemId}`
  private listTeamsUrl = `${this.baseUrl}/_apis/projects/${config.PROJECT}/teams?$mine=true&api-version=6.0`
  private getIterationUrl = `${this.baseUrl}/${config.PROJECT}/{0}/_apis/work/teamsettings/iterations?$timeframe=current&api-version=6.0`
  private getIterationWorkItemsUrl = `${this.baseUrl}/${config.PROJECT}/{0}/_apis/work/teamsettings/iterations/{1}/workitems?api-version=6.0-preview.1`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private adapter: WorkItemAdapter
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
        tap(_ => this.log('fetched iteration')),
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
