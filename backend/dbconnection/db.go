package dbconnection

import (
    "context"
    "fmt"
    "os"

    "github.com/jackc/pgx/v5/pgxpool"
)

var Pool *pgxpool.Pool

func Connect() error {
    dsn := os.Getenv("Dburl") // e.g., "postgres://user:pass@localhost:5432/dbname"
    pool, err := pgxpool.New(context.Background(), dsn)
    if err != nil {
        return fmt.Errorf("unable to connect: %v", err)
    }
    Pool = pool
    return nil
}
