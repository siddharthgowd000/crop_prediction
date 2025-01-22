from flask_sqlalchemy import SQLAlchemy

# Initialize SQLAlchemy
db = SQLAlchemy()

# Define the User class that maps to the 'users' table in the database
class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    fullname = db.Column(db.String(100), nullable=False)

    def __init__(self, username, email, fullname):
        self.username = username
        self.email = email
        self.fullname = fullname

    def __repr__(self):
        return f"<User {self.username}>"

# Define the History class that maps to the 'history' table in the database
class History(db.Model):
    __tablename__ = 'history'

    history_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer,nullable=False)
    n = db.Column(db.Float, nullable=False)
    p = db.Column(db.Float, nullable=False)
    k = db.Column(db.Float, nullable=False)
    temperature = db.Column(db.Float, nullable=False)
    humidity = db.Column(db.Float, nullable=False)
    ph = db.Column(db.Float, nullable=False)
    rainfall = db.Column(db.Float, nullable=True)
    cropname = db.Column(db.String(100), nullable=False)

    def __init__(self, n, p, k, temperature, humidity, ph, rainfall, cropname):
        self.n = n
        self.p = p
        self.k = k
        self.temperature = temperature
        self.humidity = humidity
        self.ph = ph
        self.rainfall = rainfall
        self.cropname = cropname

    def __repr__(self):
        return f"<History {self.cropname}>"
