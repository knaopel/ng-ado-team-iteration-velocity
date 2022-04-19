# Angular Azure DevOps Team Iteration Velocity
This project will produce a report of the team's velocity in the current sprint.

## Before Use

1. Run `npm install` to install the packages needed to run.
1. Copy the and/or rename the `src/environments/config.sample.ts` file to `src/environments/config.ts`.
1. Enter the Organization Name in place of `<REPLACE_WITH_ADO_ORGANIZATION>`. _(This is immediatley after the domain name in the URL. e.g. `https://dev.azure.com/organizationname`)_
1. Replace `<REPLACE_WITH_ADO_PROJECT>` with the Name or ID of the Project. _(This is Organization Name in the URL. e.g. `https://dev.azure.com/organizationname/projectname`)_

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.