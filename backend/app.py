from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, User, History  
from predict import load_model_and_predict
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Siddard111@localhost/final_year_project'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)

CORS(app)

with app.app_context():
    db.create_all()  

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    fullname = data.get('fullname')

    
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({'message': 'User already exists!'}), 400

    
    new_user = User(username=username, email=email, fullname=fullname)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully!'}), 201


@app.route('/signin', methods=['POST'])
def signin():
    data = request.json
    email = data.get('email')

    
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'Invalid email or user does not exist!'}), 404

    return jsonify({'message': f'Welcome, {user.fullname}!'}), 200


@app.route('/history/<int:user_id>', methods=['GET'])
def history_by_user(user_id):
    
    history_records = History.query.filter_by(user_id=user_id).all()

    
    if not history_records:
        return jsonify({'message': 'No history records found for this user.'}), 404

    
    history_list = [{
        'n': h.n,
        'p': h.p,
        'k': h.k,
        'temperature': h.temperature,
        'humidity': h.humidity,
        'ph': h.ph,
        'rainfall': h.rainfall,
        'cropname': h.cropname
    } for h in history_records]

    return jsonify({'history': history_list}), 200


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    n = data.get('n')
    p = data.get('p')
    k = data.get('k')
    temperature = data.get('temperature')
    humidity = data.get('humidity')
    ph = data.get('ph')
    rainfall = data.get('rainfall')
    input_values=[n,p,k,temperature,humidity,ph,rainfall]
    crop_prediction =load_model_and_predict(input_values)
    
    new_history = History(n=n, p=p, k=k, temperature=temperature, humidity=humidity,
                          ph=ph, rainfall=rainfall, cropname=crop_prediction)
    db.session.add(new_history)
    db.session.commit()

    return jsonify({{
        'n': n,
        'p': p,
        'k': k,
        'temperature': temperature,
        'humidity': humidity,
        'ph': ph,
        'rainfall': rainfall,
        'cropname': cropname
    }}), 200

if __name__ == '__main__':
    app.run(debug=True)
