# import necessary libraries
import os
from flask import Flask, render_template,  jsonify, request
import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

# Create an instance of our Flask app.
app = Flask(__name__)

#################################################
# Database Setup
#################################################
rds_connection_string = "db/economy_development_db.sqlite"
engine = create_engine(f'sqlite:///{rds_connection_string}')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

session = Session(engine)

# Save references to each table
# economy_development = Base.classes.economy_development


# Flask Routes
#List all routes that are available
@app.route("/")
def welcome():
    """Return the homepage."""
    return render_template("index.html")
    # return (
    #      f"/api/getDataFromYearToNow?indicator_code=<indicator_code>&year=<year><br/>"
    #      f"/api/getDataForYear?indicator_code=<indicator_code>&year=<year><br/>"
    #  )

# Set route
@app.route('/api/getDataFromYearToNow', methods=['GET'])
def getDataFromYearToNow(indicator_code=None, year=None):
    args = request.args
    print (args) # For debugging
    indicator_code = args['indicator_code']
    year = args['year']
    # print(indicator_code)
    # print(year)
    
    sql_query = f"SELECT country_name, country_code, indicator_name, indicator_code, year, value   FROM economy_development where indicator_code='{indicator_code}' and year >='{year}'"
    # print(sql_query)
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

# Set route
# @app.route('/api/getDataForYear?indicator_name=<indicator_name>&year=<year>')
@app.route('/api/getDataForYear', methods=['GET'])
def getDataForYear(indicator_code=None, year=None):
    args = request.args
    print (args)# For debugging
    indicator_code = args['indicator_code']
    year = args['year']
    # indicator_name = request.
    # print(request.form.get('indicator_name'))
    # print(indicator_code)
    # print(year)
    
    sql_query = f"SELECT country_name, country_code, indicator_name, indicator_code, year, value   FROM economy_development where indicator_code='{indicator_code}' and year ='{year}'"
    # print(sql_query)
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

# @app.route('/api/getDataForYear?indicator_name=<indicator_name>&year=<year>')
## adding call that fetches all data
@app.route('/api/getAll', methods=['GET'])
def getDataForYear(indicator_code=None, year=None):
    args = request.args
    print (args)# For debugging
    indicator_code = args['indicator_code']
    year = args['year']
    # indicator_name = request.
    # print(request.form.get('indicator_name'))
    print(indicator_code)
    print(year)
    
    sql_query = "SELECT country_name, country_code, indicator_name, indicator_code, year, value   FROM economy_development"
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

# /api/getCountryNames?indicator_code=<indicator_code>
@app.route('/api/getCountryNames', methods=['GET'])
def getCountryNames(indicator_code=None):
    args = request.args
    indicator_code = args['indicator_code']

    sql_query = f"SELECT DISTINCT(country_name) FROM economy_development where indicator_code= '{indicator_code}' ORDER by country_name"

    result_df = pd.read_sql_query(sql_query, engine)
    return jsonify(list(result_df['country_name']))
    
if __name__ == "__main__":
    app.run(debug=True)
