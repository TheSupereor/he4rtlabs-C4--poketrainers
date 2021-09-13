CREATE DATABASE poketrainers;

CREATE TABLE trainers(
    trainer_id SERIAL PRIMARY KEY,
    name NAME,
    region VARCHAR,
    age integer
);

CREATE TABLE pokemons(
    pokemon_id SERIAL PRIMARY KEY,
    name NAME,
    image_url VARCHAR,
    attribute VARCHAR
);

CREATE TABLE trainer_pokemons(
    trainer_id INT
    pokemon_id INT 
    FOREIGN KEY (trainer_id) REFERENCES trainers(trainer_id),
    FOREIGN KEY (pokemon_id) REFERENCES pokemons(pokemon_id)
);