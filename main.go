package main

import (
	"os"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {

	// load .env
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found (Railway mode)")
	}

	app := fiber.New()

	app.Static("/", "./public")

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	app.Listen(":" + port)
}