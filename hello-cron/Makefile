# cloud or aka, but cron is not available on cloud yet
CLOUD := aka

# appname
APP = $(notdir $(patsubst %/,%,$(dir $(abspath $(lastword $(MAKEFILE_LIST))))))

help:
	@echo "Type: make (setup|build|up|deploy|cron) CLOUD=(aka|cloud)"

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

deploy: build
	spin $(CLOUD) deploy

up:
	spin up --build

cron:
	-spin $(CLOUD) cron delete hello-cron-5min
	spin $(CLOUD) cron create -s "*/5 * * * *" -p / --name "hello-cron-5min"
	spin $(CLOUD) cron list

clean:
	rm -f *~ *.old *.bak

distclean: clean
	rm -fr build dist node_modules
