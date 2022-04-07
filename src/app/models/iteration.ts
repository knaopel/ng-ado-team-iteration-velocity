export class IterationAttributes {
  constructor(
    public startDate: Date,
    public endDate: Date,
    public timeFrame: string
  ) { }
}

export class Iteration {
  constructor(
    public id: string,
    public name: string,
    public attributes: IterationAttributes,
    public url: string
  ) { }
}

export class IterationResult {
  constructor(
    public value: Iteration[]
  ) { }
}