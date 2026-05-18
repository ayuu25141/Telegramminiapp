package main

import (
	"log"
	"os"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/joho/godotenv"
)

func main() {

	// load .env (local only, Railway ignores it)
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, using Railway env vars")
	}

	botToken := os.Getenv("BOT_TOKEN")
	webAppURL := os.Getenv("WEBAPP_URL")

	if botToken == "" {
		log.Fatal("BOT_TOKEN not set")
	}

	bot, err := tgbotapi.NewBotAPI(botToken)
	if err != nil {
		log.Panic(err)
	}

	log.Println("Bot started:", bot.Self.UserName)

	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60

	updates := bot.GetUpdatesChan(u)

	for update := range updates {

		if update.Message == nil {
			continue
		}

		msg := tgbotapi.NewMessage(update.Message.Chat.ID,
			"🚀 Open Mini App")

		msg.ReplyMarkup = tgbotapi.InlineKeyboardMarkup{
			InlineKeyboard: [][]tgbotapi.InlineKeyboardButton{
				{
					tgbotapi.InlineKeyboardButton{
						Text: "Open App",
						WebApp: &tgbotapi.WebAppInfo{
							URL: webAppURL,
						},
					},
				},
			},
		}

		bot.Send(msg)
	}
}