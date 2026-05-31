package main

import (
	
	"log"
	"os"
	"teleminiapp/api"
	"teleminiapp/bot"
	"teleminiapp/dbconnection"
	"teleminiapp/protection"
	"teleminiapp/verifyapi"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	
)




func main() {

    app := fiber.New()

app.Use(cors.New(cors.Config{
    AllowOrigins: "*",
    AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
AllowHeaders: "Content-Type, x-session-token, x-telegram-id",
}))

   

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    if err := dbconnection.Connect(); err != nil {
        log.Fatal(err)
    }

    go bot.Botii()

    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Backend Running")
    })

    app.Get("/video/:id", api.Getvideoincollection)
    app.Get("/homepagevideos", api.Getvideoinhomepage)
    app.Get("/profile", protection.Protected)
    app.Post("/verifytoken", verifyapi.Checkusertoken)

    log.Printf("Server starting on :%s", port)

    log.Fatal(app.Listen(":" + port))
}
