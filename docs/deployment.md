# Deployment Notes

This repository uses a Cloudflare Pages **Direct Upload** project. Cloudflare's current documentation states that Direct Upload projects cannot be converted into native Git integration later, so automatic deployment is handled through GitHub Actions instead.

## Required GitHub repository secrets

Add these in GitHub at `Settings` -> `Secrets and variables` -> `Actions`:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

## Cloudflare API token scope

Create a Cloudflare API token with:

- `Account`
- `Cloudflare Pages`
- `Edit`

for the account that owns `shadview-portfolio-site`.

## Workflow behavior

The workflow file at `.github/workflows/pages-deployment.yml` deploys the repository root (`.`) to the existing Pages project:

```txt
shadview-portfolio-site
```

It runs on pushes to `main` and on manual workflow dispatch.
