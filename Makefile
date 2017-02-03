run:
	gulp

build:
	rm -rf app
	gulp bootstrap
	gulp scss
	gulp imagemin
	gulp babel
	gulp jade
	gulp static

start:
	make build
	make
