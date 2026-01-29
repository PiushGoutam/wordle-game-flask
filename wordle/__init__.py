from flask import Flask, render_template

def create_app():
    app = Flask(__name__)

    @app.route('/')
    def index():        
        keylist = {'first_row':["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
                   'second_row':["A", "S", "D", "F", "G", "H", "J", "K", "L"],
                   'third_row':["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"]
                   }        
        return render_template('game-page.html', keylist=keylist)
    return app