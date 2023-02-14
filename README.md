## THIS REPO HAS BEEN MIGRATED TO GHE AND IT IS VIRTUALLY LOCKED. PLEASE, USE https://github.azc.ext.hp.com/workflow-solutions/security-monitor-action

# security-monitor-action

A GitHub Action that checks if repo has security vulnerability issues.

## Usage
### Pre-requisites
Create a workflow `.yml` file in your `.github/workflows` directory. An [example workflow](#example-workflow) is available below. For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

### Inputs

- `gh-pat`: The GitHub personal access token to be able to perform the action.
- `action-user`: The name of the user who triggers the action (gh-pat owner).

### Example workflow
This action will run on every `pull_request` with a specified type and on all branches:

```yaml
name: Security Monitor GitHub Action

on:
  pull_request:
    types: 
      - opened
      - reopened
      - synchronize
      - review_requested
      - edited
    branches:
      - "*"

jobs:
  security_monitor:
    runs-on: ubuntu-latest
    name: Security Monitor
    steps:
    - name: Security Monitor
      uses: oneflow/security-monitor-action@master
      with:
        gh-pat: ${{ secrets.GH_PAT }}
        action-user: ${{ secrets.ACTION_USER }}
```
