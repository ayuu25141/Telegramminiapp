package protection

import (
	"context"
	"strings"

	"teleminiapp/dbconnection"

	"github.com/gofiber/fiber/v2"
)

func Protected(c *fiber.Ctx) error {

	auth := c.Get("Authorization")

	if auth == "" {
		return c.Status(401).JSON(fiber.Map{
			"success": false,
		})
	}

	token := strings.TrimPrefix(auth, "Bearer ")

	var dbToken string

	err := dbconnection.Pool.QueryRow(
		context.Background(),
		`
		SELECT token
		FROM sessions
		WHERE token=$1
		AND is_active=true
		AND expires_at > NOW()
		`,
		token,
	).Scan(&dbToken)

	if err != nil {

		return c.Status(401).JSON(fiber.Map{
			"success": false,
			"message": "expired token",
		})
	}

	return c.Next()
}