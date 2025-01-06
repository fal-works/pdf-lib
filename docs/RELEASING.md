# Release Process

## Pre-release

1.  Run `git switch denkiyagi-fork && git pull origin denkiyagi-fork`
2.  Update version number in `package.json` (if not yet updated)
3.  Remove directory `node_modules` and then run `yarn install`
4.  Run `yarn release:prep`
5.  Run integration tests:
    - Run `yarn apps:node 'Preview'`
    - Run `yarn apps:node 'Adobe Acrobat'` (on Windows, passing app name does not work for now)
    - Run `yarn apps:web` and open <http://localhost:8080/apps/web/test1.html> with any browser to be tested
6.  Run `git commit -am 'Bump version to X.Y.Z'` (if not yet committed)
7.  Run `git push origin denkiyagi-fork` (if not yet pushed)

Regarding steps 2, 6 and 7, follow another process if you do not have push permission.

## Release

Create a release on GitHub.

This triggers an automatic publish to GitHub Packages.
