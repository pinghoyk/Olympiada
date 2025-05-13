# app.py
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/olympiads')
def olympiads():
    return render_template('olympiads.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/programming-olympiad')
def programming_olympiad():
    return render_template('programming-olympiad.html')
    
if __name__ == '__main__':
    app.run(debug=True)