import pickle
import numpy as np

def load_model_and_predict(input_values):
    
    with open('RandomForest.pkl', 'rb') as model_file:
        loaded_model = pickle.load(model_file)

    
    input_array = np.array(input_values).reshape(1, -1) 

    
    prediction = loaded_model.predict(input_array)

    return prediction

