run:
	./node_modules/.bin/gulp

build:
	./node_modules/.bin/gulp build

buildProd:
	NODE_ENV=production ./node_modules/.bin/gulp build

start:
	./node_modules/.bin/gulp build
	./node_modules/.bin/gulp
