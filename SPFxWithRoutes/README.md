npm install --g yo gulp
npm install @microsoft/generator-sharepoint -g
yo @microsoft/sharepoint
gulp trust-dev-cert
gulp serve



    "@angular/common": "~5.0.0",
    "@angular/compiler": "~5.0.0",
    "@angular/core": "~5.0.0",
    "@angular/forms": "~5.0.0",
    "@angular/http": "~5.0.0",
    "@angular/platform-browser": "~5.0.0",
    "@angular/platform-browser-dynamic": "~5.0.0",
    "@angular/platform-server": "~5.0.0",
    "@angular/router": "~5.0.0",
    "core-js": "^2.4.1",
    "rxjs": "^5.5.0",
    "zone.js": "^0.8.4",
    "systemjs": "0.19.39"

	
npm install sp-pnp-js --save

npm install --save reflect-metadata
npm i --save @angular/animations



## sp-search-rest

This is where you include your WebPart documentation.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO

