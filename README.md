# 3650 Capital Static Site

This project is a plain static site built from:

- `index.html`
- `styles.css`

It is configured to deploy directly to GitHub Pages with GitHub Actions.

## Deploy

1. Create a new GitHub repository.
2. Push this folder to that repository.
3. In GitHub, open `Settings > Pages`.
4. Set the source to `GitHub Actions`.
5. Push to `main` or `master`, or run the `Deploy static site to GitHub Pages` workflow manually.

GitHub Pages will publish:

- `https://<your-user-or-org>.github.io/<repo-name>/`

If this repository is your special `username.github.io` repository, it will publish at:

- `https://<your-user-or-org>.github.io/`

## First Push Example

```bash
git init
git add .
git commit -m "Prepare site for GitHub Pages"
git branch -M main
git remote add origin https://github.com/<your-user-or-org>/<repo-name>.git
git push -u origin main
```

## Notes

- The stylesheet already uses relative paths, so it works from a GitHub Pages project subpath.
- The page uses externally hosted fonts and images. Those assets must remain available for the published site to render exactly as it does locally.
