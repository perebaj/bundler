## Run the server locally
.PHONY: run
run:
	npx next dev

## Build the project and validate if there are any errors
.PHONY: build
build:
	npm run build

## Run the linting tool and fix the errors. (Not work in the CI/CD pipeline)
.PHONY: lint
lint:
	npx eslint . --fix

## Display help for all targets
.PHONY: help
help:
	@awk '/^.PHONY: / { \
		msg = match(lastLine, /^## /); \
			if (msg) { \
				cmd = substr($$0, 9, 100); \
				msg = substr(lastLine, 4, 1000); \
				printf "  ${GREEN}%-30s${RESET} %s\n", cmd, msg; \
			} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)
