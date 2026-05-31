package api

import (
	"context"
	
	"strconv"

	"teleminiapp/dbconnection"
	"teleminiapp/modals"
	"time"

	"github.com/gofiber/fiber/v2"
)

func Getvideoinhomepage(c *fiber.Ctx)error  {
	limitquery := c.Query("limit","10")
	offsetquery := c.Query("offset","0")

	limit,err := strconv.Atoi(limitquery)
	if err != nil || limit <= 0 {
		limit = 10
	}

	offset, err := strconv.Atoi(offsetquery)
	if err != nil || offset < 0 {
		offset = 0
	}

	if limit > 50 {
		limit = 50
	}

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
			likes,
			created_at
		FROM bunnyvideo
		WHERE is_public = true
		AND is_deleted = false
		ORDER BY created_at DESC
		LIMIT $1 OFFSET $2
	`
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

rows,err := dbconnection.Pool.Query(ctx,query,limit,offset)
if err!= nil{

	return c.Status(500).JSON(fiber.Map{
		"success": false,
		"message" : "database query failed",
	})
}
	defer rows.Close()

	videos := make([]modals.Video,0)

	for rows.Next() {
		var  video modals.Video
		err := rows.Scan(
				&video.ID,
			&video.Title,
			&video.BunnyVideoID,
			&video.ThumbnailURL,
			&video.DurationSeconds,
			&video.Category,
			&video.Tags,
			&video.Views,
			&video.Likes,
			&video.CreatedAt,
		)
		if err != nil{
			continue
		}
		videos = append(videos, video)
	}
	return c.JSON(fiber.Map{
		"success": true,
		"videos":  videos,
		"limit":   limit,
		"offset":  offset,
	})


}