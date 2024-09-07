CREATE TABLE users(
  username VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR (150) NOT NULL,
  PRIMARY KEY (username)
)

CREATE TABLE games(
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  title TEXT,
  description TEXT,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  location TEXT,
  number_of_players INT NOT NULL,
  sport TEXT,
  host INT,
  participants INTEGER[]
)

CREATE TABLE PROFILE(
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  name TEXT,
  email TEXT,
  country TEXT,
  state_of_country TEXT
)

CREATE TABLE game_participants (
id SERIAL PRIMARY KEY,
user_id INT NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(id),
game_id INT NOT NULL,
FOREIGN KEY (game_id) REFERENCES games(id)
)