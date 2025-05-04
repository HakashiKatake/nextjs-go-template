package config

import (
	"os"
)

// Config holds application configuration
type Config struct {
	Port           string
	MongoURI       string
	MongoDBName    string
	ClerkSecretKey string
	AllowedOrigins []string
}

// New returns a new Config
func New() *Config {
	return &Config{
		Port:           getEnv("PORT", "8080"),
		MongoURI:       getEnv("MONGO_URI", "mongodb://localhost:27017"),
		MongoDBName:    getEnv("MONGO_DB_NAME", "webapp"),
		ClerkSecretKey: getEnv("CLERK_SECRET_KEY", ""),
		AllowedOrigins: []string{
			"http://localhost:3000",
			getEnv("FRONTEND_URL", ""),
		},
	}
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
