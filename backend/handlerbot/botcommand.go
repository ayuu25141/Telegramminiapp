// package handlerbot

// import (
// 	"context"
// 	"fmt"
// 	"time"

// 	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"

// 	"teleminiapp/dbconnection"
// 	"teleminiapp/service"
// )

// func HandleGenerate(
// 	bot *tgbotapi.BotAPI,
// 	chatID int64,
// 	userID int64,
// 	username string,
// 	firstName string,
// ) {

// 	// CHECK SESSION
// 	var isActive bool
// 	var availtoken string

// 	err := dbconnection.Pool.QueryRow(
// 		context.Background(),
// 		`
// 		SELECT is_active,token
// 		FROM sessions
// 		WHERE user_id = (
// 			SELECT id FROM users WHERE telegram_id=$1
// 		)
// 		`,
// 		userID,
// 	).Scan(&isActive,&availtoken)

// 	if err == nil && isActive {

// 		msg := tgbotapi.NewMessage(
// 			chatID,
// 			"Already Active Token ✅"+""+availtoken,
// 		)

// 		bot.Send(msg)
// 		return
// 	}

// 	// GENERATE TOKEN
// 	token := service.GenerateToken()

// 	// CREATE PASTE
// 	pasteURL, err := service.CreatePaste(token)
// 	if err != nil {

// 		msg := tgbotapi.NewMessage(
// 			chatID,
// 			"Paste Create Failed ❌",
// 		)

// 		bot.Send(msg)
// 		return
// 	}

// 	// CREATE SHORT LINK
// 	shortURL, err := service.CreateShortLink(pasteURL)
// 	if err != nil {

// 		msg := tgbotapi.NewMessage(
// 			chatID,
// 			"Short Link Failed ❌",
// 		)

// 		bot.Send(msg)
// 		return
// 	}

// 	// INSERT USER
// 	_, err = dbconnection.Pool.Exec(
// 		context.Background(),
// 		`
// 		INSERT INTO users
// 		(
// 			telegram_id,
// 			username,
// 			first_name
// 		)
// 		VALUES
// 		($1, $2, $3)
// 		ON CONFLICT (telegram_id)
// 		DO NOTHING
// 		`,
// 		userID,
// 		username,
// 		firstName,
// 	)

// 	if err != nil {

// 		fmt.Println(err)

// 		msg := tgbotapi.NewMessage(
// 			chatID,
// 			"User Save Error ❌",
// 		)

// 		bot.Send(msg)
// 		return
// 	}

// 	// GET USER DATABASE ID
// 	var dbUserID string

// 	err = dbconnection.Pool.QueryRow(
// 		context.Background(),
// 		`
// 		SELECT id
// 		FROM users
// 		WHERE telegram_id=$1
// 		`,
// 		userID,
// 	).Scan(&dbUserID)

// 	if err != nil {

// 		fmt.Println(err)

// 		msg := tgbotapi.NewMessage(
// 			chatID,
// 			"User Fetch Error ❌",
// 		)

// 		bot.Send(msg)
// 		return
// 	}

// 	// SAVE SESSION
// 	_, err = dbconnection.Pool.Exec(
// 		context.Background(),
// 		`
// 		INSERT INTO sessions
// 		(
// 			token,
// 			user_id,
// 			expires_at,
// 			created_at,
// 			is_active
// 		)
// 		VALUES
// 		($1, $2, $3, $4, $5)
// 		`,
// 		token,
// 		dbUserID,
// 		time.Now().Add(20*time.Hour),
// 		time.Now(),
// 		true,
// 	)

// 	if err != nil {

// 		fmt.Println(err)

// 		msg := tgbotapi.NewMessage(
// 			chatID,
// 			"Database Error ❌",
// 		)

// 		bot.Send(msg)

// 		return
// 	}

// 	// SEND LINK
// 	msg := tgbotapi.NewMessage(
// 		chatID,
// 		"Your Token Link ✅\n\n"+shortURL,
// 	)

// 	bot.Send(msg)
// }



package handlerbot

import (
	"context"
	"fmt"
	"time"

	"teleminiapp/dbconnection"
	"teleminiapp/service"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
)

func HandleGenerate(
	bot *tgbotapi.BotAPI,
	chatID int64,
	userID int64,
	username string,
	firstName string,
) {

	// deactivate expired sessions
	_, _ = dbconnection.Pool.Exec(
		context.Background(),
		`
		UPDATE sessions
		SET is_active = false
		WHERE expires_at <= NOW()
		`,
	)

	// check for active valid session
	var availToken string

	err := dbconnection.Pool.QueryRow(
		context.Background(),
		`
		SELECT token
		FROM sessions
		WHERE user_id = (
			SELECT id
			FROM users
			WHERE telegram_id = $1
		)
		AND is_active = true
		AND expires_at > NOW()
		LIMIT 1
		`,
		userID,
	).Scan(&availToken)

	if err == nil {

		msg := tgbotapi.NewMessage(
			chatID,
			"Already Active Token ✅\n\n"+availToken,
		)

		bot.Send(msg)
		return
	}

	// generate new token
	token := service.GenerateToken()

	// create paste
	pasteURL, err := service.CreatePaste(token)
	if err != nil {

		msg := tgbotapi.NewMessage(
			chatID,
			"Paste Create Failed ❌",
		)

		bot.Send(msg)
		return
	}

	// create short url
	shortURL, err := service.CreateShortLink(pasteURL)
	if err != nil {

		msg := tgbotapi.NewMessage(
			chatID,
			"Short Link Failed ❌",
		)

		bot.Send(msg)
		return
	}

	// create user if not exists
	_, err = dbconnection.Pool.Exec(
		context.Background(),
		`
		INSERT INTO users
		(
			telegram_id,
			username,
			first_name
		)
		VALUES
		($1,$2,$3)
		ON CONFLICT (telegram_id)
		DO NOTHING
		`,
		userID,
		username,
		firstName,
	)

	if err != nil {

		fmt.Println(err)

		msg := tgbotapi.NewMessage(
			chatID,
			"User Save Error ❌",
		)

		bot.Send(msg)
		return
	}

	// get db user id
	var dbUserID string

	err = dbconnection.Pool.QueryRow(
		context.Background(),
		`
		SELECT id
		FROM users
		WHERE telegram_id = $1
		`,
		userID,
	).Scan(&dbUserID)

	if err != nil {

		fmt.Println(err)

		msg := tgbotapi.NewMessage(
			chatID,
			"User Fetch Error ❌",
		)

		bot.Send(msg)
		return
	}

	// token valid for 24 hours
	expiresAt := time.Now().UTC().Add(24 * time.Hour)

	// save session
	_, err = dbconnection.Pool.Exec(
		context.Background(),
		`
		INSERT INTO sessions
		(
			token,
			user_id,
			expires_at,
			created_at,
			is_active
		)
		VALUES
		($1,$2,$3,$4,$5)
		`,
		token,
		dbUserID,
		expiresAt,
		time.Now().UTC(),
		true,
	)

	if err != nil {

		fmt.Println(err)

		msg := tgbotapi.NewMessage(
			chatID,
			"Database Error ❌",
		)

		bot.Send(msg)
		return
	}

	msg := tgbotapi.NewMessage(
		chatID,
		"Your Token Link ✅\n\n"+shortURL,
	)

	bot.Send(msg)
}
















