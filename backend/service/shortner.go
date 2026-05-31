package service

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

type PasteResponse struct {
	Link string `json:"link"`
}

func CreatePaste(token string) (string, error) {

	api := os.Getenv("Paste")

	// 20 HOURS FROM NOW
	expireTime := time.Now().
		Add(20 * time.Hour).
		Format(time.RFC3339)

	body := map[string]interface{}{
		"description": "Telegram Token for Use  Miniapp",

		"expiration": expireTime,

		"sections": []map[string]string{
			{
				"name":     "token",
				"contents": token,
			},
		},
	}

	jsonData, _ := json.Marshal(body)

	req, _ := http.NewRequest(
		"POST",
		"https://api.paste.ee/v1/pastes",
		bytes.NewBuffer(jsonData),
	)

	req.Header.Set("X-Auth-Token", api)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}

	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}

	defer resp.Body.Close()

	data, _ := io.ReadAll(resp.Body)

	var result PasteResponse

	json.Unmarshal(data, &result)

	if result.Link == "" {
		fmt.Println(string(data))
		return "", fmt.Errorf("paste create failed")
	}

	return result.Link, nil
}