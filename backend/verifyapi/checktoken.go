package verifyapi

import (
	"context"

	"teleminiapp/dbconnection"
	"teleminiapp/modals"
"fmt"
	"github.com/gofiber/fiber/v2"
)

func Checkusertoken(c *fiber.Ctx) error {
	fmt.Println("RAW BODY:", string(c.Body()))
	var body modals.Tokencheckmodal
fmt.Println(body.Token)
fmt.Println(body.TelegramID)
	if err := c.BodyParser(&body); err != nil {
		fmt.Println(err)
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "invalid body",
		})
	}

	// get actual db user id from telegram id
	var dbUserID string

	err := dbconnection.Pool.QueryRow(
		context.Background(),
		`
		SELECT id
		FROM users
		WHERE telegram_id=$1
		`,
		body.TelegramID,
	).Scan(&dbUserID)

	if err != nil {
fmt.Println(err)
		return c.Status(401).JSON(fiber.Map{
			"success": false,
			"message": "User not found",
		})
	}

	// check token
	var token string

	err = dbconnection.Pool.QueryRow(
		context.Background(),
		`
		SELECT token
		FROM sessions
		WHERE token=$1
		AND user_id=$2
		AND is_active=true
		AND expires_at > NOW()
		`,
		body.Token,
		dbUserID,
	).Scan(&token)

	if err != nil {
fmt.Println(err)
		return c.Status(401).JSON(fiber.Map{
			"success": false,
			"message": "Invalid or expired token",
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"message": "Unlocked",
	})
}