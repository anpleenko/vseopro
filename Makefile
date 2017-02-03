run:
	./node_modules/.bin/gulp

build:
	rm -rf app
	./node_modules/.bin/gulp bootstrap
	./node_modules/.bin/gulp scss
	./node_modules/.bin/gulp imagemin
	./node_modules/.bin/gulp babel
	./node_modules/.bin/gulp jade
	./node_modules/.bin/gulp static

start:
	make build
	make
