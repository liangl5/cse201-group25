import sqlite3

connection = sqlite3.connect('database.db')


with open('create_GitAppsDB.sql') as f:
    connection.executescript(f.read())


cur = connection.cursor()
connection.commit()
connection.close()