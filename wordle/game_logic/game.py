from flask.views import MethodView
from flask_smorest import Blueprint
from .schemas import CheckWordSchema
import requests

blp = Blueprint("game", __name__, description="perform operations on games")

@blp.route('/check-submission-valid')
class CheckWord(MethodView):

    @blp.arguments(CheckWordSchema)
    def post(self, form_data ):

        word = form_data['word'].lower()

        # check if the word exists by querying it to a public dictionary API.
        response = requests.get(f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}")
        if isinstance(response.json(), list):
            if response.json()[0].get("meanings", None):
                return {"message": "valid_word"}, 200            
        
        return {"message": "invalid_word"}, 404