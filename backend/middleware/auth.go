package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// AuthMiddleware validates user authentication
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get user ID from header (set by the Next.js API routes)
		userID := c.GetHeader("X-User-ID")

		if userID == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		// Set user ID for downstream handlers
		c.Set("userID", userID)

		c.Next()
	}
}
