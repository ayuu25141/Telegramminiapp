package bot

import (
	"log"
	"os"
	"time"

	"teleminiapp/handlerbot"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
)

func Botii() {

	apitoken := os.Getenv("Bottoken")

	bot, err := tgbotapi.NewBotAPI(apitoken)
	if err != nil {
		log.Fatal(err)
	}

	bot.Debug = false

	log.Println("Bot Started")

	updateconfig := tgbotapi.NewUpdate(0)
	updateconfig.Timeout = 60

	updates := bot.GetUpdatesChan(updateconfig)

	for {

		select {

		case update := <-updates:

			// message
			if update.Message != nil {

				if update.Message.Text == "/start" {

					button := tgbotapi.NewInlineKeyboardMarkup(
						tgbotapi.NewInlineKeyboardRow(
							tgbotapi.NewInlineKeyboardButtonData(
								"Generate Token",
								"generate_token",
							),
						),
					)

					msg := tgbotapi.NewMessage(
						update.Message.Chat.ID,
						"Welcome",
					)

					msg.ReplyMarkup = button

					_, err := bot.Send(msg)

					if err != nil {
						log.Println(err)
					}
				}
			}

			// callback
			if update.CallbackQuery != nil {

				if update.CallbackQuery.Data == "generate_token" {

					handlerbot.HandleGenerate(
						bot,
						update.CallbackQuery.Message.Chat.ID,
						update.CallbackQuery.From.ID,
						update.CallbackQuery.From.UserName,
						update.CallbackQuery.From.FirstName,
					)
				}
			}

		default:

			time.Sleep(100 * time.Millisecond)

		}
	}
}
