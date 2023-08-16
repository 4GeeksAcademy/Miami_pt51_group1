from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, declarative_base

db = SQLAlchemy()

class User(db.Model):
    __tableName__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    first_name = db.Column(db.String(80), unique=False, nullable=True)
    last_name = db.Column(db.String(120), unique=False, nullable=True)
    recovery_question = db.Column(db.String(80), unique=False, nullable=True)
    recovery_answer = db.Column(db.String(80), unique=False, nullable=True)
    country = db.Column(db.String(120), unique=False, nullable=True)
    territory_state = db.Column(db.String(80), unique=False, nullable=True)
    dob = db.Column(db.String(80), unique=False, nullable=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=True)
    # favorites =db.relationship("Favorites", backref= "user")

    def __repr__(self):
        return f'<User {self.email}>'
    
    
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "recovery_question": self.recovery_question,
            "recovery_answer": self.recovery_answer,
            "country": self.country,
            "territory_state": self.territory_state,
            "dob": self.dob,
            # do not serialize the password, its a security breach
        }
    
class Favorites(db.Model):
    __tableName__ = "favorites"
    id = db.Column(db.Integer, primary_key=True)
    # maybe db.Boolean(False)
    # favorite = db.Column(db.Boolean,db.ForeignKey('user.favorites') , unique=False, nullable=True ,default= False)
    User_id = db.Column( db.Integer, db.ForeignKey("user.id"))
    country = db.Column(db.String(120), unique=False, nullable=True)
    territory_state = db.Column(db.String(80), unique=False, nullable=True)
    # destinations =db.relationship("Destinations", backref= "favorites")
    # foreingKey = User.db 
    # user_id = db.Column(db.Integer, ForeignKey(User.id),unique = True )
    def serialize(self):
        return {
            "id": self.id,
        }    
        

class Destinations(db.Model):
    __tableName__ = "destinations"
    id = db.Column(db.Integer, primary_key=True)
    city =  db.Column(db.String(120), unique=False, nullable=True) 
    country = db.Column(db.String(120), unique=False, nullable=True) 
    description = db.Column(db.String(120), unique=False, nullable=True) 
    # favorites_id = db.Column( db.Integer, db.ForeignKey("favorites.id"))

    def serialize(self):
        return {
            "id": self.id,
        }    


class Flights(db.Model): 
    __tableName__ = "flights"
    id = db.Column(db.Integer, primary_key=True)
    price =  db.Column(db.String(120), unique=False, nullable=True) 
    flightProvider = db.Column(db.String(120), unique=False, nullable=True) 
    depatureDate = db.Column(db.String(120), unique=False, nullable=True) 
    

    def serialize(self):
        return {
            "id": self.id,
            "price": self.price,
            "flightProvider": self.flightProvider,
            "depatureDate": self.depatureDate,
            
        }    


