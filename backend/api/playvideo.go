package api

import (
	"context"
	"teleminiapp/dbconnection"
	"teleminiapp/modals"
"fmt"
	"github.com/gofiber/fiber/v2"
)
func Getvideoincollection(c *fiber.Ctx)error{
videoid := c.Params("id")
var  video modals.Video
fmt.Println(videoid)
query := `
	SELECT
		id,
		title,
		bunny_video_id,
	
		thumbnail_url,
		duration_seconds,
	
		category,
		tags,
		views,
		likes
	
	FROM bunnyvideo
	WHERE id = $1
	AND is_deleted = false
	LIMIT 1
	`

	err := dbconnection.Pool.QueryRow(
		context.Background(),
		query,
		videoid,
	).Scan(
		&video.ID,
		&video.Title,
		&video.BunnyVideoID,

		&video.ThumbnailURL,
		&video.DurationSeconds,
	
		&video.Category,
		&video.Tags,
		&video.Views,
		&video.Likes,
		
	)

	if err != nil {
fmt.Println(err)
		return c.Status(404).JSON(fiber.Map{
			"success": false,
			"message": "Video not found",
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"video": video,
	})
}