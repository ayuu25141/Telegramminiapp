// package verifyapi

// import (
// 	"context"

// 	"teleminiapp/dbconnection"
// 	"teleminiapp/modals"
// "fmt"
// 	"github.com/gofiber/fiber/v2"
// )

// func Checkusertoken(c *fiber.Ctx) error {
// 	fmt.Println("RAW BODY:", string(c.Body()))
// 	var body modals.Tokencheckmodal
// fmt.Println(body.Token)
// fmt.Println(body.TelegramID)
// 	if err := c.BodyParser(&body); err != nil {
// 		fmt.Println(err)
// 		return c.Status(400).JSON(fiber.Map{
// 			"success": false,
// 			"message": "invalid body",
// 		})
// 	}

// 	// get actual db user id from telegram id
// 	var dbUserID string

// 	err := dbconnection.Pool.QueryRow(
// 		context.Background(),
// 		`
// 		SELECT id
// 		FROM users
// 		WHERE telegram_id=$1
// 		`,
// 		body.TelegramID,
// 	).Scan(&dbUserID)

// 	if err != nil {
// fmt.Println(err)
// 		return c.Status(401).JSON(fiber.Map{
// 			"success": false,
// 			"message": "User not found",
// 		})
// 	}

// 	// check token
// 	var token string

// 	err = dbconnection.Pool.QueryRow(
// 		context.Background(),
// 		`
// 		SELECT token
// 		FROM sessions
// 		WHERE token=$1
// 		AND user_id=$2
// 		AND is_active=true
// 		AND expires_at > NOW()
// 		`,
// 		body.Token,
// 		dbUserID,
// 	).Scan(&token)

// 	if err != nil {
// fmt.Println(err)
// 		return c.Status(401).JSON(fiber.Map{
// 			"success": false,
// 			"message": "Invalid or expired token",
// 		})
// 	}

// 	return c.JSON(fiber.Map{
// 		"success": true,
// 		"message": "Unlocked",
// 	})
// }










package verifyapi

import (
	"context"
	"fmt"

	"teleminiapp/dbconnection"
	"teleminiapp/modals"

	"github.com/gofiber/fiber/v2"
)

func Checkusertoken(c *fiber.Ctx) error {

	fmt.Println("RAW BODY:", string(c.Body()))

	var body modals.Tokencheckmodal

	if err := c.BodyParser(&body); err != nil {
		fmt.Println("Body Parse Error:", err)

		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "invalid body",
		})
	}

	fmt.Println("Token:", body.Token)
	fmt.Println("TelegramID:", body.TelegramID)

	// Get user id from telegram id
	var dbUserID string

	err := dbconnection.Pool.QueryRow(
		context.Background(),
		`
		SELECT id
		FROM users
		WHERE telegram_id = $1
		`,
		body.TelegramID,
	).Scan(&dbUserID)

	if err != nil {
		fmt.Println("USER QUERY ERROR:", err)

		return c.Status(401).JSON(fiber.Map{
			"success": false,
			"message": "User not found",
		})
	}

	fmt.Println("DB User ID:", dbUserID)

	// Verify token
	var token string

	err = dbconnection.Pool.QueryRow(
		context.Background(),
		`
		SELECT token
		FROM sessions
		WHERE token = $1
		AND user_id = $2
		AND is_active = true
		AND expires_at > NOW()
		`,
		body.Token,
		dbUserID,
	).Scan(&token)

	if err != nil {
		fmt.Println("TOKEN QUERY ERROR:", err)

		// Extra debugging
		rows, _ := dbconnection.Pool.Query(
			context.Background(),
			`
			SELECT token,user_id,is_active,expires_at
			FROM sessions
			WHERE user_id = $1
			`,
			dbUserID,
		)

		fmt.Println("Sessions for user:")
		for rows.Next() {
			var t, uid string
			var active bool
			var exp interface{}

			rows.Scan(&t, &uid, &active, &exp)

			fmt.Println(
				"token:", t,
				"user_id:", uid,
				"is_active:", active,
				"expires_at:", exp,
			)
		}

		return c.Status(401).JSON(fiber.Map{
			"success": false,
			"message": "Invalid or expired token",
		})
	}

	fmt.Println("TOKEN VERIFIED SUCCESSFULLY")

	return c.JSON(fiber.Map{
		"success": true,
		"message": "Unlocked",
	})
}
