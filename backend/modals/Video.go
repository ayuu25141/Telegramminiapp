package modals

import "time"

type Video struct {
	ID              string     `db:"id" json:"id"`

	Title           string     `db:"title" json:"title"`

	BunnyVideoID    *string    `db:"bunny_video_id" json:"bunny_video_id,omitempty"`

	ThumbnailURL    *string    `db:"thumbnail_url" json:"thumbnail_url,omitempty"`

	DurationSeconds *int       `db:"duration_seconds" json:"duration_seconds,omitempty"`

	Category        *string    `db:"category" json:"category,omitempty"`

	Tags            []string   `db:"tags" json:"tags"`

	Views           int64      `db:"views" json:"views"`

	Likes           int64      `db:"likes" json:"likes"`

	CreatedAt       time.Time  `db:"created_at" json:"created_at"`
}