package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"webapp/handlers"
	"webapp/middleware"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	// Initialize MongoDB connection
	client, err := connectToMongoDB()
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}
	defer func() {
		if err = client.Disconnect(context.Background()); err != nil {
			log.Printf("Error disconnecting from MongoDB: %v", err)
		}
	}()

	// Get database reference
	dbName := os.Getenv("MONGO_DB_NAME")
	if dbName == "" {
		dbName = "webapp"
	}
	db := client.Database(dbName)

	// Initialize handlers
	userHandler := handlers.NewUserHandler(db)
	healthHandler := handlers.NewHealthHandler()

	// Create Gin router
	router := gin.Default()

	// Public routes
	router.GET("/api/health", healthHandler.Check)

	// User routes
	router.POST("/api/users", userHandler.CreateOrUpdateUser)
	router.GET("/api/users/:id", middleware.AuthMiddleware(), userHandler.GetUserByClerkID)
	router.GET("/api/users", middleware.AuthMiddleware(), userHandler.ListUsers)

	// Configure CORS
	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   []string{"https://nextjs-go-template-virid.vercel.app/"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization", "X-User-ID"},
		AllowCredentials: true,
		MaxAge:           300,
	})

	// Start the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, corsMiddleware.Handler(router)))
}

func connectToMongoDB() (*mongo.Client, error) {
	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		mongoURI = "mongodb://localhost:27017"
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOptions := options.Client().ApplyURI(mongoURI)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		return nil, err
	}

	// Check the connection
	err = client.Ping(ctx, nil)
	if err != nil {
		return nil, err
	}

	log.Println("Connected to MongoDB!")
	return client, nil
}
