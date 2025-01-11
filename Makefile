.PHONY: build
build: ## Build the docker image.
	docker compose build

.PHONY: run 
run: ## Start the docker container.
	docker compose up --build

.PHONY: dev
dev: ## Start the development server.
	npm run dev
