package modals

import (
	"time"
)

type Sessionmodel struct {
	Token string `db:"token" json:"token"`

	UserID int64 `db:"user_id" json:"user_id"`

	PasteURL string `db:"paste_url" json:"paste_url"`

	ShortURL string `db:"short_url" json:"short_url"`

	IsActive bool `db:"is_active" json:"is_active"`

	ExpiresAt time.Time `db:"expires_at" json:"expires_at"`

	CreatedAt time.Time `db:"created_at" json:"created_at"`
}