from flask import Flask, render_template

def create_app():
    app = Flask(__name__)

    @app.route('/')
    def index():        
        keylist = [["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
                   ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
                   ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"]
        ]    
        return render_template('game-page.html', keylist=keylist)
    return app