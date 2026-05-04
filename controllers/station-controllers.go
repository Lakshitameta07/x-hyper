package controllers

import (
	"net/http"

	"x-hyper-charge-backend/data"

	"github.com/gin-gonic/gin"
)

func GetStations(c *gin.Context) {
	vehicleType := c.Query("type")

	var filtered []interface{}

	for _, s := range data.Stations {
		if vehicleType == "" || s.Type == vehicleType {
			filtered = append(filtered, s)
		}
	}

	c.JSON(http.StatusOK, filtered)
}
