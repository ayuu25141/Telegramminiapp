package main

import (
	"fmt"
	"log"
	"os"
	"teleminiapp/api"
	"teleminiapp/bot"
	"teleminiapp/dbconnection"
	"teleminiapp/protection"
	"teleminiapp/verifyapi"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

// func main() {
// port := os.Getenv("PORT")

// if port == "" {
//     port = "8080"
// }

// log.Fatal(app.Listen(":" + port))

// app := fiber.New()
// app.Use(cors.New(cors.Config{
//     AllowOrigins: "*",
//     AllowHeaders: "Origin, Content-Type, Accept, Authorization",
//     AllowMethods: "GET, POST, PUT, DELETE, OPTIONS",
//     AllowCredentials: false, // * ke saath false hona chahiye
// }))
// // ← Ye add karo CORS ke baad
// // Preflight ke liye
// app.Options("/*", func(c *fiber.Ctx) error {
//     c.Set("Access-Control-Allow-Origin", "*")
//     c.Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
//     c.Set("Access-Control-Allow-Headers", "*")
//     return c.SendStatus(204)
// })
// fmt.Println("backend start at port 8080")

// // db connection

// if err := dbconnection.Connect()
// err != nil{
// 	fmt.Println("error in db connection")
// }
// fmt.Println("db connected successfuly")

// bot.Botii()
// 	app.Get("/", func(c *fiber.Ctx) error {
// 		return c.SendString("Backend Running")
// 	})


// app.Get("/video/:id",api.Getvideoincollection)	
// app.Get("/homepagevideos", api.Getvideoinhomepage)
// app.Get("/profile",protection.Protected)	
// app.Post("/verifytoken",verifyapi.Checkusertoken)


// err :=app.Listen(port)
// log.Fatal(err)

// }






func main() {

    app := fiber.New()

    app.Use(cors.New(cors.Config{
        AllowOrigins: "*",
        AllowHeaders: "Origin, Content-Type, Accept, Authorization",
        AllowMethods: "GET, POST, PUT, DELETE, OPTIONS",
    }))

    app.Options("/*", func(c *fiber.Ctx) error {
        return c.SendStatus(204)
    })

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
