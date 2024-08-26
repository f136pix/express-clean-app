.PHONY: build-express-db build-dotnet-db run-dbs

build-express-db:
	@echo "--> Building express-db container <--"
	docker-compose build express-db
	@if [ $$? -eq 0 ]; then echo "express-db built successfully"; else echo "Error building express-db"; fi

build-dotnet-db:
	@echo "--> Building dotnet-db container <--"
	docker-compose build dotnet-db
	@if [ $$? -eq 0 ]; then echo "dotnet-db built successfully"; else echo "Error building dotnet-db"; fi

run-dbs: build-express-db build-dotnet-db
	@echo "----------------------------------------------------"
	@echo "--> Running express-db and dotnet-db containers <--"
	@echo "----------------------------------------------------"
	docker-compose up -d express-db dotnet-db