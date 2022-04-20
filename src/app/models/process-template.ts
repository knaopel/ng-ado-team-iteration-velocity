export class ProcessTemplate {
  constructor(
    public typeId: string,
    public name: string,
    public description: string,
    public isEnabled: boolean,
    public customizationType: string,
    public isDefault: boolean,
    public referenceName?: string,
    public parentProcessTypeId?: string
  ) { }
}
