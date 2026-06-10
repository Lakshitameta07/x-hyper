package main

import (
	"x-hyper-charge-backend/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	routes.AuthRoutes(r)
	routes.StationRoutes(r)

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "X Hyper Charge Backend Running 🚀",
		})
	})

	r.Run(":8080")
}
