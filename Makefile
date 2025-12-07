#
# Installs tools as instructed in https://spinframework.dev/v3/install
#

help:
	@echo "Type: make setup"
	@echo "NOTE: This works on OSX/Linux, but not on Windows"

setup:
	curl -fsSL https://spinframework.dev/downloads/install.sh | bash
	spin plugins install aka
	spin plugins install cloud
	spin plugins install pluginify
	spin plugins install -u https://github.com/fermyon/spin-cloud-gpu/releases/download/canary/cloud-gpu.json -y

clean:
	rm -f *~ *.old *.bak
	for i in hello-*/; do make -C $$i clean; done

distclean:
	rm -f *~ *.old *.bak
	for i in hello-*/; do make -C $$i distclean; done
