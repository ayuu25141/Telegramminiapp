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

func main() {
		// Load .env file
if err := godotenv.Load(); err != nil {
    log.Println("⚠️ .env not found, using system environment variables")
}

port := os.Getenv("Port")

app := fiber.New()
app.Use(cors.New(cors.Config{
    AllowOrigins: "*",
    AllowHeaders: "Origin, Content-Type, Accept, Authorization",
    AllowMethods: "GET, POST, PUT, DELETE, OPTIONS",
    AllowCredentials: false, // * ke saath false hona chahiye
}))
// ← Ye add karo CORS ke baad
// Preflight ke liye
app.Options("/*", func(c *fiber.Ctx) error {
    c.Set("Access-Control-Allow-Origin", "*")
    c.Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    c.Set("Access-Control-Allow-Headers", "*")
    return c.SendStatus(204)
})
fmt.Println("backend start at port 8080")

// db connection

if err := dbconnection.Connect()
err != nil{
	fmt.Println("error in db connection")
}
fmt.Println("db connected successfuly")

bot.Botii()
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Backend Running")
	})


app.Get("/video/:id",api.Getvideoincollection)	
app.Get("/homepagevideos", api.Getvideoinhomepage)
app.Get("/profile",protection.Protected)	
app.Post("/verifytoken",verifyapi.Checkusertoken)


err :=app.Listen(port)
log.Fatal(err)

}
