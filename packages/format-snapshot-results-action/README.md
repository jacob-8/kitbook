# format-snapshot-results-action

Action for formatting Kitbook visual regression snapshot results in preparation for commenting on PR. 

## Example usage

```yaml
uses: jacob-8/kitbook/packages/format-snapshot-results-action@v1
with:
  upload-results: '${{ steps.upload-snapshots.outputs.uploaded }}'
  pr: '${{ steps.findPr.outputs.pr }}'
  bucket: '${{ env.BUCKET_NAME }}'
  project: '${{ env.PROJECT_NAME }}'
  deployment-url: '${{ env.PLAYWRIGHT_BASE_URL }}'
  kitbook-route: '${{ env.KITBOOK_ROUTE }}'
```

## How to release update

```bash
pnpm -F format-snapshot* package
git tag -d v1
git push origin --delete v1
git tag v1
git push origin v1
```
