import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";

// export interface IWorkItemFields {
//   "System.CommentCount": number;
//   "Microsoft.VSTS.Scheduling.Effort": number;
// }

// export interface IWorkItem {
//   id: number;
//   rev: number;
//   fields: IWorkItemFields;
//   url: string;
// }

export class WorkItemFields {
  constructor(
    public effort: number,
    public storyPoints: number,
    public title: string
  ) { }
}

export class WorkItem {
  constructor(
    public id: number,
    public rev: number,
    public fields: WorkItemFields,
    public url: string
  ) { }
}

@Injectable({
  providedIn: "root"
})
export class WorkItemAdapter implements Adapter<WorkItem> {
  constructor(private adapter: WorkItemFieldsAdapter) { }
  adapt(item: any): WorkItem {
    return new WorkItem(item.id, item.rev, this.adapter.adapt(item.fields), item.url);
  }
}

export class WorkItemFieldsAdapter implements Adapter<WorkItemFields>{
  adapt(item: any): WorkItemFields {
    return new WorkItemFields(item["Microsoft.VSTS.Scheduling.Effort"], item["Microsoft.VSTS.Scheduling.StoryPoints"], item["System.Title"]);
  }
}