package data

import "x-hyper-charge-backend/models"

var Users []models.User

var Stations = []models.Station{
	{ID: 1, Name: "Station A", Latitude: 28.6139, Longitude: 77.2090, Type: "4W"},
	{ID: 2, Name: "Station B", Latitude: 28.6150, Longitude: 77.2105, Type: "2W"},
}
