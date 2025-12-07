# OpenRouter API key, passed by SPI_VARIABLE_XXX= or --variable xxx=
KEY =

# aka or cloud
CLOUD = aka

# appname
APP = $(notdir $(patsubst %/,%,$(dir $(abspath $(lastword $(MAKEFILE_LIST))))))

help:
	@echo "Type: make (setup|build|up|deploy) CLOUD=(aka|cloud) KEY=..."

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

ifeq ($(KEY),)
up deploy:
	@echo "Need KEY= arg to pass OpenRouter API key"
else
up:
	SPIN_VARIABLE_API_KEY=$(KEY) spin up --build

deploy:
	spin $(CLOUD) deploy --variable api_key=$(KEY)
endif

clean:
	rm -f *~ *.old *.bak

distclean: clean
	rm -fr build dist node_modules
