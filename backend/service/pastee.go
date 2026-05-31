// package service

// import (
//     "encoding/json"
//     "fmt"
//     "io"
//     "net/http"
//     "os"
// )

// type ShortResponse struct {
//     ShortenedUrl string `json:"shortenedUrl"`
// }

// func CreateShortLink(url string) (string, error) {
//     api := os.Getenv("Ariolink")

//     endpoint := fmt.Sprintf(
//         "https://arolinks.com/st?api=%s&url=%s",
//         api,
//         url,
//     )

//     resp, err := http.Get(endpoint)
//     if err != nil {
//         return "", err
//     }
//     defer resp.Body.Close()

//     body, _ := io.ReadAll(resp.Body)

//     var result ShortResponse
//     json.Unmarshal(body, &result)

//     if result.ShortenedUrl == "" {
//         return string(body), nil
//     }

//     return result.ShortenedUrl, nil
// }
package service

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
)

type ShortResponse struct {
	Status       string `json:"status"`
	Message      string `json:"message"`
	ShortenedUrl string `json:"shortenedUrl"`
}

func CreateShortLink(longURL string) (string, error) {

	apiKey := "6d0bb528ff97abf2b03fe3750f79a37445dcba46"

	endpoint := fmt.Sprintf(
		"https://arolinks.com/api?api=%s&url=%s",
		apiKey,
		url.QueryEscape(longURL),
	)

	resp, err := http.Get(endpoint)
	if err != nil {
		return "", err
	}

	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	var result ShortResponse

	err = json.Unmarshal(body, &result)
	if err != nil {
		return "", err
	}

	return result.ShortenedUrl, nil
}