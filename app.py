import os
import random
import logging
from functools import lru_cache
from flask import Flask, request, render_template
import pandas as pd
import pickle
import requests
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
logging.basicConfig(level=logging.INFO)

TMDB_API_KEY = os.getenv("TMDB_API_KEY")

# data & models
movies = pickle.load(open("model/movies_list.pkl", "rb"))
similarity = pickle.load(open("model/similarity.pkl", "rb"))
df = pd.read_pickle("pickle_folder/movies_list.pkl")

title_to_id = dict(zip(movies.title, movies.movie_id))
title_to_idx = {t: i for i, t in enumerate(movies.title)}
all_genres = sorted({g for genres in df.genres for g in genres})

@lru_cache(maxsize=1000)
def fetch_poster(id_):
    try:
        r = requests.get(
            f"https://api.themoviedb.org/3/movie/{id_}",
            params={"api_key": TMDB_API_KEY, "language": "en-US"}
        ).json()
        path = r.get("poster_path")
        return f"https://image.tmdb.org/t/p/w500/{path}" if path else "/static/default.jpg"
    except:
        return "/static/default.jpg"

def recommend(title):
    idx = title_to_idx.get(title)
    if idx is None: 
        return [], []
    sims = sorted(enumerate(similarity[idx]), key=lambda x: x[1], reverse=True)
    picks = sims[1:5]
    names, posters = [], []
    for i, _ in picks:
        t = movies.iloc[i].title
        names.append(t)
        posters.append(fetch_poster(movies.iloc[i].movie_id))
    return names, posters

@app.route("/")
def home():
    picks = random.sample(list(movies.title), 10)
    posters = [fetch_poster(title_to_id[t]) for t in picks]
    return render_template("index.html", random_posters=posters)

@app.route("/recommendation", methods=["GET", "POST"])
def rec():
    movie_list = movies.title.values
    if request.method == "POST":
        title = request.form.get("movies")
        if title in title_to_id:
            names, posters = recommend(title)
            return render_template(
                "prediction.html",
                movies_name=[title] + names,
                poster=[fetch_poster(title_to_id[title])] + posters,
                movie_list=movie_list,
                status=True
            )
        else:
            error = "Movie not found"
            logging.info(error)
            return render_template("prediction.html", error=error, movie_list=movie_list, status=False)
    return render_template("prediction.html", movie_list=movie_list, status=False)

@app.route("/genres", methods=["GET", "POST"])
def genres_view():
    sel = request.form.getlist("genres") if request.method=="POST" else request.args.getlist("genres")
    page = int(request.args.get("page", 1))
    per_page = 15
    if not sel:
        return render_template("genres_page.html", genres=all_genres, message="Select at least one genre", **{"movies":[], "selected_genres":sel, "page":1, "total_pages":0})
    f = df[df.genres.apply(lambda gs: all(g in gs for g in sel))]
    total = len(f)
    start, end = (page-1)*per_page, page*per_page
    sub = f.iloc[start:end].to_dict("records")
    for m in sub:
        m["poster_url"] = fetch_poster(m["movie_id"])
    pages = total//per_page + (1 if total%per_page else 0)
    msg = None if sub else "No movies found"
    return render_template("genres_page.html",
                           movies=sub, genres=all_genres, selected_genres=sel,
                           message=msg, page=page, total_pages=pages)

@app.route("/about")
def about(): return render_template("about.html")

@app.route("/contact")
def contact(): return render_template("contact.html")

if __name__ == "__main__":
    app.run(debug=True)
