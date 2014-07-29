polyworksgames.com
==================

project for the polyworks games website: www.polyworksgames.com 

## INSTALLING GRUNT JS

1. install node.js with homebrew: `brew install node`
2. install grunt command line: `npm install -g grunt-cli`
3. install grunt-based node modules: `npm install` and `npm install grunt-scp` (latter is not picked up and needs to be explicitly installed)

## RUNNING LOCAL SERVER

`grunt connect`

this allows testing the site at: localhost:9090/public/src/

## BUILD

`grunt build`

this creates the public/build directory, copying minified js and css, and html and image files

testing can be done at: localhost:9090/public/build/

## DEPLOYING

`grunt deploy` 

copies all files in public/build directory to dreamhost server, polyworksgames.com directoy. 

- note: the meta.json file will need to be in grunt/data directory in order to perform deploy. this file is not included in the git repository. save meta.json.templ file as meta.json changing [ user ] and [ password ] to correct values. 