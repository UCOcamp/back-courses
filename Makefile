.PHONY: build dev sdev

SHELL=/bin/zsh
include .env
export

build:
		@docker build . -t leivaa/ucocamp_backend_courses
		@echo -e "\n"
		@echo -e "Courses microservice was built. Use make dev to start programming"

dev:
		@docker-compose up --build -d
		@echo -e "\n"
		@echo -e "\e[1;42m[DEV]\e[0m Courses microservice is UP. http://localhost:${PORT}"

sdev:
		@docker-compose stop
		@echo -e "\n"
		@echo -e "\e[1;42m[DEV]\e[0m Courses microservice STOPPED."