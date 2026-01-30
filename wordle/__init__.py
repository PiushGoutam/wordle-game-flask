from flask import Flask, render_template
from .game_logic.game import blp as GameLogic
from flask_smorest import Api

def create_app():
    app = Flask(__name__)
    app.config['API_TITLE'] = "wordle game api"
    app.config['API_VERSION'] = "v1"
    app.config['OPENAPI_VERSION'] = "3.0.1"

    api = Api(app)
    api.register_blueprint(GameLogic)

    @app.route('/')
    def index():        
        keylist = [["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
                   ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
                   ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"]
        ]    
        return render_template('game-page.html', keylist=keylist)
    return app