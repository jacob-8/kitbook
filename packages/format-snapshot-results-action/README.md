# format-snapshot-results-action

Action for formatting Kitbook visual regression snapshot results in preparation for commenting on PR. 

## Example usage

```yaml
uses: jacob-8/kitbook/packages/format-snapshot-results-action@1.0.0-beta.2
with:
  upload-results: '${{ steps.upload-snapshots.outputs.uploaded }}'
  pr: '${{ steps.findPr.outputs.pr }}'
  bucket: '${{ env.BUCKET_NAME }}'
  project: '${{ env.PROJECT_NAME }}'
```
