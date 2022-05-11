package main

import (

	// TODO: answer here

	"encoding/json"
	"time"

	vegeta "github.com/tsenart/vegeta/v12/lib"
)

type Movie struct {
	ID      int    `json:"id"`
	Episode int    `json:"episode"`
	Name    string `json:"name"`
}

//Baca README untuk tau jumlah request yang perlu dilakukan dan targetnya
//untuk durasi cukup gunakan satu detik

//menambahkan movie baru
//untuk data yang dikirim adalah JSON
//gunakan struct Movie diatas, cukup gunakan field episode dan name
//ID sudah auto increment
func addMovieTest(target string) *vegeta.Metrics {
	metrics := &vegeta.Metrics{}
	// TODO: answer here
	addmoviee := Movie{
		Episode: 1,
		Name:    "test",
	}
	res, err := json.Marshal(addmoviee)
	if err != nil {
		panic(err)
	}
	duration := time.Second
	frequency := 10

	targeter := vegeta.NewStaticTargeter(vegeta.Target{
		Method: "POST",
		URL:    target,
		Body:   []byte(res),
	})
	rate := vegeta.ConstantPacer{Freq: frequency, Per: time.Second}
	metrics = vegetaAttack(targeter, rate.Freq, duration)
	return metrics
}

//mendapatkan informasi movie dengan ID 1-25
//vegeta.NewStaticTargeter() adalah variadic function
//kita bisa menggunakannya untuk menentukan multiple target vegeta attack
func getMovieTest(target string) *vegeta.Metrics {
	metrics := &vegeta.Metrics{}
	duration := 1 * time.Second
	frequency := 1
	targeter := vegeta.NewStaticTargeter(vegeta.Target{
		Method: "GET",
		URL:    target,
	})
	rate := vegeta.ConstantPacer{Freq: frequency, Per: time.Second}
	metrics = vegetaAttack(targeter, rate.Freq, duration)

	return metrics
}

//mendapatkan semua informasi movie
func getMoviesTest(target string) *vegeta.Metrics {
	metrics := &vegeta.Metrics{}
	duration := 1 * time.Second
	frequency := 1
	targeter := vegeta.NewStaticTargeter(vegeta.Target{
		Method: "GET",
		URL:    target,
	})
	rate := vegeta.ConstantPacer{Freq: frequency, Per: time.Second}
	metrics = vegetaAttack(targeter, rate.Freq, duration)

	return metrics
}

func vegetaAttack(targeter vegeta.Targeter, frequency int, duration time.Duration) *vegeta.Metrics {
	rate := vegeta.Rate{Freq: frequency, Per: time.Second}
	attacker := vegeta.NewAttacker()
	var metrics vegeta.Metrics
	for res := range attacker.Attack(targeter, rate, duration, "Example") {
		metrics.Add(res)
	}
	metrics.Close()
	return &metrics
}
