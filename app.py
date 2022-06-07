from flask import Flask, render_template
import json

with open("config.json") as f:
    data = json.load(f)

with open("scores.json") as f:
    scores = json.load(f)

app = Flask(__name__)
app.config["SECRET_KEY"] = data["app_secret_key"]

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/getConfig")
def getConfig():
    return data

@app.route("/getScores/<name>/<score>")
def getScores(name, score):
    scoreData = scores["scores"]
    for i in range(len(scoreData)):
        if int(score) < scoreData[i][1]:
            scoreData.insert(i, [name, int(score)])
            if len(scoreData) > 10:
                scoreData = scoreData[:-1]
            break
        elif i == len(scoreData) - 1 and i < 9:
            scoreData.append([name, int(score)])

    scores["scores"] = scoreData
    with open("scores.json", "w") as f:
        json.dump(scores, f, indent=4)
    return scores

@app.route("/<page>")
def page(page):
    with open(f"templates/{page}.html", encoding="utf8") as f:
        return f.read()

if __name__ == "__main__":
    app.run(debug=True)