from flask import Flask, redirect, url_for, render_template, request, session
import json
import requests

with open("config.json") as f:
    data = json.load(f)

app = Flask(__name__)
app.config["SECRET_KEY"] = data["app_secret_key"]

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/getConfig")
def getConfig():
    return data

@app.route("/<page>")
def page(page):
    with open(f"templates/{page}.html", encoding="utf8") as f:
        return f.read()

if __name__ == "__main__":
    app.run(debug=True)