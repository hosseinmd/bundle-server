#!/bin/sh
echo "stop app"
pm2 stop digikala-qa-bundle 

echo "pull changes"
git pull

echo "install packages"
yarn

echo "compiling"
tsc

echo "run app"
pm2 start ./dist/app.js --name digikala-qa-bundle 