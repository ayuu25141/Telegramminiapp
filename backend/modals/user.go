package modals
import(
	"time"
)
type Usermodal struct{
	ID         string    `db:"id" json:"id"`
	TelegramID int64     `db:"telegram_id" json:"telegram_id"`

	Username  *string    `db:"username" json:"username,omitempty"`
	FirstName *string    `db:"first_name" json:"first_name,omitempty"`

	CreatedAt time.Time  `db:"created_at" json:"created_at"`
}