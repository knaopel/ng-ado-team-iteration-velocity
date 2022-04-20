import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";

export class ProjectProperties {
  constructor(
    public processTemplate: string,
    public processTemplateId: string,
    public processTemplateTypeId: string,
  ) { }
}

// export class ProjectProperty {
//   constructor(
//     public name: string,
//     public value: string
//   ) { }
// }

@Injectable({
  providedIn: "root"
})
export class ProjectPropertiesAdapter implements Adapter<any>{
  adapt(properties: { count: number, value: Array<{ name: string, value: string }> }): ProjectProperties {
    const processTemplate = properties.value.find(p => p.name === 'System.Process Template')?.value;
    const processTemplateId = properties.value.find(p => p.name === "System.CurrentProcessTemplateId")?.value;
    const processTemplateTypeId = properties.value.find(p => p.name === "System.ProcessTemplateType")?.value;
    return new ProjectProperties(processTemplate || '', processTemplateId || '', processTemplateTypeId || '');
  }
}

// export class ProjectPropertyAdapter implements Adapter<ProjectProperty>{
//   adapt(property:any):ProjectProperty {
//     return new ProjectProperty(property.name,property.value);
//   }
// }

/*
{
  "count": 10,
  "value": [
    {
      "name": "System.CurrentProcessTemplateId",
      "value": "d20a960d-95fe-4d0e-b795-02056fb8ca66"
    },
    {
      "name": "System.OriginalProcessTemplateId",
      "value": "d20a960d-95fe-4d0e-b795-02056fb8ca66"
    },
    {
      "name": "System.ProcessTemplateType",
      "value": "adcc42ab-9882-485e-a3ed-7678f01f66bc"
    },
    {
      "name": "System.MSPROJ",
      "value": "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<MSProject>\r\n  <Mappings>\r\n    <Mapping WorkItemTrackingFieldReferenceName=\"System.AreaPath\" ProjectField=\"pjTaskOutlineCode9\" />\r\n    <Mapping WorkItemTrackingFieldReferenceName=\"System.AssignedTo\" ProjectField=\"pjTaskResourceNames\" />\r\n    <Mapping WorkItemTrackingFieldReferenceName=\"System.Id\" ProjectField=\"pjTaskText10\" ProjectName=\"Work Item ID\" />\r\n    <Mapping WorkItemTrackingFieldReferenceName=\"System.IterationPath\" ProjectField=\"pjTaskOutlineCode10\" ProjectName=\"Sprint\" />\r\n    <Mapping WorkItemTrackingFieldReferenceName=\"System.Reason\" ProjectField=\"pjTaskText14\" />\r\n    <Mapping WorkItemTrackingFieldReferenceName=\"System.Rev\" ProjectField=\"pjTaskText23\" />\r\n    <Mapping WorkItemTrackingFieldReferenceName=\"System.State\" ProjectField=\"pjTaskText13\" ProjectName=\"State\" />\r\n    <Mapping WorkItemTrackingFieldReferenceName=\"System.Title\" ProjectField=\"pjTaskName\" />\r\n    <Mapping WorkItemTrackingFieldReferenceName=\"System.WorkItemType\" ProjectField=\"pjTaskText24\" />\r\n    <Mapping WorkItemTrackingFieldReferenceName=\"Microsoft.VSTS.Common.BacklogPriority\" ProjectField=\"pjTaskNumber1\" ProjectName=\"Backlog Priority\" />\r\n    <Mapping WorkItemTrackingFieldReferenceName=\"Microsoft.VSTS.Scheduling.RemainingWork\" ProjectField=\"pjTaskRemainingWork\" ProjectUnits=\"pjHour\" IfSummaryRefreshOnly=\"true\" />\r\n    <LinksField ProjectField=\"pjTaskText26\" />\r\n    <SyncField ProjectField=\"pjTaskText25\" />\r\n  </Mappings>\r\n</MSProject>"
    },
    {
      "name": "System.Process Template",
      "value": "Scrum"
    },
    {
      "name": "System.Microsoft.TeamFoundation.Team.Count",
      "value": 1
    },
    {
      "name": "System.Microsoft.TeamFoundation.Team.Default",
      "value": "5c4364a2-2bbd-47a3-8174-454457a23a54"
    },
    {
      "name": "System.SourceControlCapabilityFlags",
      "value": "2"
    },
    {
      "name": "System.SourceControlGitEnabled",
      "value": "True"
    },
    {
      "name": "System.SourceControlGitPermissionsInitialized",
      "value": "True"
    }
  ]
}
*/