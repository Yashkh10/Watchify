# Watchify 🎬

**Watchify** is a content-based movie recommendation system that helps users discover new movies based on their preferences. It suggests movies similar in content using features like genres, cast, and more — all powered by natural language processing and similarity scoring.

---

## 🚀 Features

- **Content-Based Filtering**: Recommends movies based on their metadata (genres, actors, etc.)
- **Cosine Similarity**: Measures similarity between movies using a bag-of-words model
- **Genre Explorer**: Browse movies by genre
- **Lightweight Flask App**: Easy to run and modify

---

## 🛠️ How It Works

1. The app builds a bag-of-words representation of each movie using genre, keywords, cast, and director.
2. Cosine similarity is computed between all movies.
3. When a movie is selected, the most similar ones are recommended.

---

## 🧰 Project Structure

```

- `app.py`: Main application script.
- `model/`: Contains saved model files and similarity matrices (`.pkl` files).
- `templates/`: HTML templates used for rendering pages, including:
  - `about.html`
  - `base.html`
  - `contact.html`
  - `genres_page.html`
  - `header.html`
  - `index.html`
- `static/`: Static assets like CSS, JavaScript, and images.

````

---

## ⚙️ Getting Started

### 🔗 Clone the Repository

```bash
git clone https://github.com/Yashkh10/Watchify.git
cd Watchify
````

### 🐍 Create Virtual Environment

```bash
python -m venv moviesenv
# Windows
moviesenv\Scripts\activate
# macOS/Linux
source moviesenv/bin/activate
```

### 📦 Install Dependencies

```bash
pip install -r requirements.txt
```

### ▶️ Run the Application

```bash
python app.py
```

Then, open your browser and navigate to `http://127.0.0.1:5000/` to start discovering movies!

---

## 📋 Requirements

Here are the core Python libraries required:

```
flask
numpy
pandas
scikit-learn
python-dotenv
```

You can generate your own `requirements.txt` by running:

```bash
pip freeze > requirements.txt
```

---

## 🤝 Contributing

Pull requests are welcome! If you have ideas for improvement or new features, feel free to fork and submit a PR.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Enjoy movie time with **Watchify**! 🍿

```
