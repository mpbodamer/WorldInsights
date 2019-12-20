# import necessary libraries
import os
from flask import Flask, render_template,  jsonify

# Import our pymongo library, which lets us connect our Flask app to our Mongo database.

import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

# Create an instance of our Flask app.
app = Flask(__name__)

rds_connection_string = "weda/economy_development_db.sqlite"
engine = create_engine(f'sqlite:///{rds_connection_string}')

Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

session = Session(engine)

# Set route
@app.route('/api/economy_development/<indicator_name>/<year>')
def economy_development(indicator_name, year=None):
    
    sql_query = f"SELECT country_name, country_code, indicator_name, indicator_code, year, value   FROM economy_development where indicator_name='{indicator_name}' and year >='{year}'"
    print(sql_query)
    results = engine.execute(sql_query).fetchall()

    economy_development_data = []
    for result in results:
        row = {}
        row['country_name'] = result[0]
        row['country_code'] = result[1]
        row['indicator_name'] = result[2]
        row['indicator_code'] = result[3]
        row['year'] = result[4]
        row['value'] = result[5]
        economy_development_data.append(row)
        
    return jsonify(economy_development_data)


if __name__ == "__main__":
    app.run(debug=True)
