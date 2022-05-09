package handlers

import (
	"net/http"

	"github.com/ruang-guru/playground/backend/golang-http-server/assignment/url-shortener/repository"

	"github.com/gin-gonic/gin"
)

type URLHandler struct {
	repo *repository.URLRepository
}

func NewURLHandler(repo *repository.URLRepository) URLHandler {
	return URLHandler{
		repo: repo,
	}
}

func (h *URLHandler) Get(c *gin.Context) {

	path := c.Param("path")
	url, err := h.repo.Get(path)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"url": url,
	})
}

func (h *URLHandler) Create(c *gin.Context) {

	longURL := c.PostForm("longURL")
	url, err := h.repo.Create(longURL)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"url": url,
	})
}

func (h *URLHandler) CreateCustom(c *gin.Context) {

	longURL := c.PostForm("longURL")
	if longURL == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "long_url is required",
		})
		return
	}
	customPath := c.PostForm("customPath")
	if customPath == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "custom_path is required",
		})
		return
	}
	url, err := h.repo.CreateCustom(longURL, customPath)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"url": url,
	})

}
