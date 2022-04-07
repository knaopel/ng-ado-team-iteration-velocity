export class WorkItemRelationsResult {
  constructor(
    public workItemRelations: WorkItemRelation[]
  ) { }
}

export class WorkItemRelation {
  constructor(
    public target: {
      id: string,
      url: string

    },
    public rel?: string,
    public source?: {
      id: string,
      url: string
    },
  ) { }
}