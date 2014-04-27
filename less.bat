@echo off

::lessc --source-map-map-inline public/less/override.less > public/css/style.css
recess public/less/override.less --compress > public/css/style.css
pause