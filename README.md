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

## 📁 Project Structure

```
Watchify/
│
├── app.py                  # Main Flask application
├── requirements.txt        # Python dependencies
│
├── model/                  # Saved models and similarity matrices
│   └── similarity.pkl      # Precomputed similarity matrix (generated manually)
│
├── templates/              # HTML templates for the web pages
│   ├── about.html
│   ├── base.html
│   ├── contact.html
│   ├── genres_page.html
│   ├── header.html
│   └── index.html
│
└── static/                 # Static files (CSS, JS, Images)
    ├── css/
    ├── js/
    └── images/
```

---

## ⚙️ Getting Started

### 🔗 Clone the Repository

```bash
git clone https://github.com/Yashkh10/Watchify.git
cd Watchify
```

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

---

## 📦 Generating `similarity.pkl` (Required Before Running the App)

Before launching the Watchify app, make sure the required similarity matrix is generated and saved.

### 🔧 Steps:

1. Open the notebook:

```
template/Movie Recommendation System.ipynb
```

2. Run all cells from top to bottom.

3. At the end, a file named `similarity.pkl` will be saved in the `model/` directory.

> ✅ If the notebook does not automatically save the file, you can manually add and run this cell at the end:

```python
import os, pickle
os.makedirs("model", exist_ok=True)

with open("model/similarity.pkl", "wb") as f:
    pickle.dump(similarity, f)
```

Make sure `similarity` is the cosine similarity matrix variable created in the notebook.

---

## ▶️ Run the Application

```bash
python app.py
```

Then open your browser and navigate to:

```
http://127.0.0.1:5000/
```

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
