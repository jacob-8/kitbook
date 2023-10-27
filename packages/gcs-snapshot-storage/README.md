# GCS Snapshot Storage Action

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Inputs

## `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

## Outputs

## `time`

The time we greeted you.

## Example usage

uses: jacob-8/kitbook/packages/gcs-snapshot-storage@v1
with:
  who-to-greet: 'Mona the Octocat'

On main
  - run playwright, outputting snapshots to e2e/snapshots
  - >> recursively delete bucket/main if exists
  - >> upload e2e/snapshots to bucket/main

On PR
  - >> download snapshots from bucket/main to e2e/snapshots
  - run playwright so it outputs changed and new snapshots
  - if results
    - >> recursively delete bucket/pr/<PR#>
    - >> upload all changed/new snapshots to bucket/pr/<PR#>
    - >> output links to all snapshots so next action step can comment them on the PR
