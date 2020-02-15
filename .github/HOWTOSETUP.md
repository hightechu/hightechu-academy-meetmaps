# HighTechU Academy Group Project - How to Setup :octopus:

This is the repository for the HighTechU Academy Group Projects.

## Template Setup :dragon:

Create a new repository with `hightechu-academy-group` as the template. Click the `Use this template` button on the repository.

Name the new repository `hightechu-academy-group-[COOLNAME]`. Add a description similar to this `HighTechU Academy Group Project for Cohort X - 20XX`. And add topics. These are the standard topics: `group-project`, `hightechu`, `academy`, `cohortX`, `termYEAR`, `[COOLNAME]`.

## CODEOWNERS Setup :ox:

To setup CODEOWNERS add your username to the `CODEOWNERS` file.

```
* @hightechu/staff @your-username
```

## Repository Setup :leaves:

Update the `README.md` and `SUPPORT.md` file. Add the Slack Link to the correct links. 

```md
[HighTechU Slack Channel]()
```

Add the `[academy-group]` as Collaborators with `write` permission. 

Add the `Staff` as Collaborators with `maintain` permission.

Create a branch protection rule for the `master` branch. Select `Require pull request reviews before merging` and `Include administrators`.

Remove `Wikis`. 
