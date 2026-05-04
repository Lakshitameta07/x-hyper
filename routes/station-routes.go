package routes

import (
	"x-hyper-charge-backend/controllers"

	"github.com/gin-gonic/gin"
)

func StationRoutes(r *gin.Engine) {
	r.GET("/stations", controllers.GetStations)
}
