.PHONY: run-dbs seed-express-db run-rabbitmq migrate-express-db run-express-image run-dotnet-image run-express
 
run-express-image: build-express-image 
	@echo "--> Running express image <--"
	docker-compose up -d express
	#docker run --name express-api --network=express-clean-app_default -p 5000:5000 express-api
	
run-express : 
	@echo "--> Running express locally <--"
	cd express && \
	yarn migrate && \
	yarn seed && \
	yarn start
	
run-dotnet-image: build-dotnet-image
	@echo "--> Running dotnet image <--"
	docker run --name dotnet-api --network=express-clean-app_default -p 3000:3000 dotnet-api
	
build-express-image:
	@echo "--> Building express image <--"
	docker-compose build express
	#docker build -t express-api ./express
	
build-dotnet-image:
	@echo "--> Building dotnet image <--"
	docker build -t dotnet-api ./dotnet-api	
	
run-rabbitmq:
	docker-compose build rabbitmq

build-express-db:
	@echo "--> Building express-db container <--"
	docker-compose stop express-db
	docker-compose rm -f express-db
	docker-compose build express-db
	
build-dotnet-db:
	@echo "--> Building dotnet-db container <--"
	docker-compose stop dotnet-db
	docker-compose rm -f dotnet-db
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
	
migrate-dotnet-db: 
	@echo "--> Migrating dotnet-db <--"
	cd dotnet-api && dotnet ef database update
	