package models

type Station struct {
	ID             int      `json:"id"`
	Name           string   `json:"name"`
	City           string   `json:"city"`
	State          string   `json:"state"`
	Country        string   `json:"country"`
	Latitude       float64  `json:"latitude"`
	Longitude      float64  `json:"longitude"`
	Address        string   `json:"address"`
	Operator       string   `json:"operator"`
	Type           string   `json:"type"`
	ChargerType    string   `json:"chargerType"`
	ConnectorTypes []string `json:"connectorTypes"`
	PowerKW        int      `json:"powerKW"`
	TotalPorts     int      `json:"totalPorts"`
	AvailablePorts int      `json:"availablePorts"`
	Status         string   `json:"status"`
	PricePerUnit   float64  `json:"pricePerUnit"`
	Open24Hours    bool     `json:"open24Hours"`
}
