.PHONY: run-dbs seed-express-db run-rabbitmq migrate-express-db

run-rabbitmq:
	docker-compose build rabbitmq

build-express-db:
	@echo "--> Building express-db container <--"
	docker-compose build express-db

build-dotnet-db:
	@echo "--> Building dotnet-db container <--"
	docker-compose build dotnet-db

run-dbs: build-express-db build-dotnet-db
	@echo "----------------------------------------------------"
	@echo "--> Running express-db and dotnet-db containers <--"
	@echo "----------------------------------------------------"
	docker-compose up -d express-db dotnet-db

seed-express-db:
	@echo "--> Migrating express-db <--"
	cd express && yarn seed
	
migrate-express-db: 
	@echo "--> Migrating express-db <--"
	cd express && yarn migrate
	
migrate dotnet db: 
	@echo "--> Migrating dotnet-db <--"
	cd dotnet-api && dotnet ef database update