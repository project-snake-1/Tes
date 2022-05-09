package repository

import (
	"sync"

	"github.com/ruang-guru/playground/backend/golang-http-server/assignment/url-shortener/entity"
)

type URLRepository struct {
	mu   sync.Mutex
	Data map[string]string
}

func NewMapRepository() URLRepository {
	data := make(map[string]string, 0)
	return URLRepository{
		Data: data,
	}
}

func (r *URLRepository) Get(path string) (*entity.URL, error) {
	r.mu.Lock()
	defer r.mu.Unlock()
	data := r.Data
	if _, ok := data[path]; !ok {
		return nil, entity.ErrBadRequest
	}

	return &entity.URL{
		LongURL:  data[path],
		ShortURL: path,
	}, nil

}

func (r *URLRepository) Create(longURL string) (*entity.URL, error) {
	r.mu.Lock()
	defer r.mu.Unlock()
	path := entity.GetRandomShortURL(longURL)
	return &entity.URL{
		LongURL:  longURL,
		ShortURL: path,
	}, nil

}

func (r *URLRepository) CreateCustom(longURL, customPath string) (*entity.URL, error) {
	r.mu.Lock()
	defer r.mu.Unlock()
	return &entity.URL{
		LongURL:  longURL,
		ShortURL: customPath,
	}, nil
}
