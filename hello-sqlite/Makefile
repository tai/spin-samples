# aka or cloud, but database is not on aka yet
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

.PHONY: build
build:
	spin build

up: sample.db
	mkdir -p .spin
	cp sample.db .spin/sqlite_db.db
	spin up --build

deploy: build upload
	spin $(CLOUD) deploy

setup: initdb

dropdb:
	-spin cloud app delete hello-sqlite
	-spin cloud sqlite delete myclouddb

initdb:
	spin cloud sqlite create myclouddb
	spin cloud sqlite list

upload: sample.sql
	-spin $(CLOUD) sqlite execute -d myclouddb "DROP TABLE data_stream_stdin"
	-spin $(CLOUD) sqlite execute -d myclouddb "DROP TABLE sales"
	spin $(CLOUD) sqlite execute -d myclouddb @$<

sample.csv:
	gencsv.py 100 > $@

sample.db: sample.csv
	rm -f $@
	q -d, -H -S sample.db "SELECT * FROM -" < $<
	sqlite3 $@ "ALTER TABLE data_stream_stdin RENAME TO sales"

sample.sql: sample.db
	sqlite3 $< .d | egrep -v '^(PRAGMA|BEGIN|COMMIT)' > $@

clean:
	rm -f *~ *.old *.bak

distclean: clean
	rm -f *.sql *.db
	rm -fr build dist node_modules
