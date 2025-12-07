# aka or cloud
CLOUD = aka

# appname
APP = $(notdir $(patsubst %/,%,$(dir $(abspath $(lastword $(MAKEFILE_LIST))))))

help:
	@echo "Type: make (setup|build|up|deploy) CLOUD=(aka|cloud)"

info:
ifeq ($(CLOUD),aka)
	spin $(CLOUD) app status --app-name $(APP)
else
	spin $(CLOUD) app info $(APP)
endif

setup:
	@echo No setup is needed

.PHONY: build
build:
	spin build

up:
	spin up --build

deploy: build
	spin $(CLOUD) deploy

clean:
	rm -f *~ *.old *.bak

distclean: clean
	rm -fr build dist node_modules
