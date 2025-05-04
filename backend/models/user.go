package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// User represents a user in the system
type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	ClerkID   string             `bson:"clerkId" json:"clerkId"`
	Email     string             `bson:"email" json:"email"`
	FirstName string             `bson:"firstName" json:"firstName"`
	LastName  string             `bson:"lastName" json:"lastName"`
	ImageURL  string             `bson:"imageUrl" json:"imageUrl"`
	CreatedAt time.Time          `bson:"createdAt" json:"createdAt"`
	UpdatedAt time.Time          `bson:"updatedAt" json:"updatedAt"`
	// Add more fields as needed for your application
}

// UserInput represents input data for creating/updating a user
type UserInput struct {
	ClerkID   string `json:"clerkId" binding:"required"`
	Email     string `json:"email" binding:"required"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	ImageURL  string `json:"imageUrl"`
}
