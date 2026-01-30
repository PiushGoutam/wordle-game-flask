from marshmallow import Schema, fields

class CheckWordSchema(Schema):
    word = fields.Str(required=True)