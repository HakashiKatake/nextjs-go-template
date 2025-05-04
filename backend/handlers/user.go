package handlers

import (
	"context"
	"net/http"
	"time"

	"webapp/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// UserHandler handles user-related requests
type UserHandler struct {
	collection *mongo.Collection
}

// NewUserHandler creates a new UserHandler
func NewUserHandler(db *mongo.Database) *UserHandler {
	return &UserHandler{
		collection: db.Collection("users"),
	}
}

// CreateOrUpdateUser creates a new user or updates an existing one
func (h *UserHandler) CreateOrUpdateUser(c *gin.Context) {
	var input models.UserInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create context with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Check if user already exists
	var existingUser models.User
	err := h.collection.FindOne(ctx, bson.M{"clerkId": input.ClerkID}).Decode(&existingUser)

	now := time.Now()

	if err == nil {
		// User exists, update
		update := bson.M{
			"$set": bson.M{
				"email":     input.Email,
				"firstName": input.FirstName,
				"lastName":  input.LastName,
				"imageUrl":  input.ImageURL,
				"updatedAt": now,
			},
		}

		_, err = h.collection.UpdateOne(ctx, bson.M{"clerkId": input.ClerkID}, update)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"success": true,
			"message": "User updated successfully",
		})
		return
	}

	if err != mongo.ErrNoDocuments {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	// Create new user
	user := models.User{
		ClerkID:   input.ClerkID,
		Email:     input.Email,
		FirstName: input.FirstName,
		LastName:  input.LastName,
		ImageURL:  input.ImageURL,
		CreatedAt: now,
		UpdatedAt: now,
	}

	_, err = h.collection.InsertOne(ctx, user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "User created successfully",
	})
}

// GetUserByClerkID retrieves a user by their Clerk ID
func (h *UserHandler) GetUserByClerkID(c *gin.Context) {
	clerkID := c.Param("id")
	userID := c.GetString("userID")

	// Ensure the requesting user is fetching their own profile
	// Unless this is a protected admin route, which would require additional checks
	if clerkID != userID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Unauthorized access"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var user models.User
	err := h.collection.FindOne(ctx, bson.M{"clerkId": clerkID}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	c.JSON(http.StatusOK, user)
}

// ListUsers returns a list of users (with pagination)
func (h *UserHandler) ListUsers(c *gin.Context) {
	// This would typically be restricted to admin users
	// For demo purposes it's included here

	limit := 10 // Default limit
	skip := 0   // Default skip

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	findOptions := options.Find()
	findOptions.SetLimit(int64(limit))
	findOptions.SetSkip(int64(skip))
	findOptions.SetSort(bson.D{{Key: "createdAt", Value: -1}})

	cursor, err := h.collection.Find(ctx, bson.M{}, findOptions)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}
	defer cursor.Close(ctx)

	var users []models.User
	if err := cursor.All(ctx, &users); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode users"})
		return
	}

	c.JSON(http.StatusOK, users)
}
