# aka or cloud, but LLM is not on aka yet
CLOUD = cloud

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

# launch GPU proxy for local testing
setup: runtime-config.toml

runtime-config.toml:
	-spin cloud-gpu destroy
	spin cloud-gpu init | tee runtime-config.tmp
	grep -A3 llm_compute runtime-config.tmp > $@

.PHONY: build
build:
	spin build

deploy: build
	spin $(CLOUD) deploy

up: runtime-config.toml
	spin up --build --runtime-config-file $<

clean:
	rm -f *~ *.old *.bak

distclean: clean
	rm -f runtime-config.*
	rm -fr build dist node_modules
