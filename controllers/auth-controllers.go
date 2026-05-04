package controllers

import (
	"net/http"

	"x-hyper-charge-backend/data"
	"x-hyper-charge-backend/models"

	"github.com/gin-gonic/gin"
)

func Signup(c *gin.Context) {
	var newUser models.User

	if err := c.BindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data"})
		return
	}

	newUser.ID = len(data.Users) + 1
	data.Users = append(data.Users, newUser)

	c.JSON(http.StatusOK, gin.H{
		"message": "User created",
		"user":    newUser,
	})
}

func Login(c *gin.Context) {
	var input models.User

	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data"})
		return
	}

	for _, user := range data.Users {
		if user.Email == input.Email && user.Password == input.Password {
			c.JSON(http.StatusOK, gin.H{
				"message": "Login successful",
				"user":    user,
			})
			return
		}
	}

	c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
}
