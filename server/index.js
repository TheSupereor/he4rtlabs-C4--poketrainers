var express = require('express');
var app = express();
var cors = require('cors');
const pool = require('./db')

app.use(cors());
app.use(express.json());

//----------------------------- Rotas --------------------------------

//---------------- treinador ----------------
//criar um novo treinador
app.post('/trainers', async (req, res) => {
    try {
        const { name, region, age } = req.body;

        const newTrainer = await pool.query(
            "INSERT INTO trainers (name, region, age) VALUES ($1, $2, $3) RETURNING *", [name, region, age]
        );

        res.json(newTrainer.rows[0]);
    } catch (err) {
        console.log(err.message)
    }
})

//pegar treinador por nome
app.get('/trainers/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const trainer = await pool.query("SELECT * FROM trainers WHERE name = $1", [ name ]);
    
        res.json(trainer.rows[0])
    } catch (err) {
        console.log(err.message)
    }
})

//atualizar dados do treinador
app.put('trainers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, region, age } = req.body;

        const updateTrainer = await pool.query(
            "UPDATE trainers SET name = $1, region = $2, age = $3 WHERE trainer_id = $4", [name, region, age, id]
        );

        res.json("Dados de treinador atualizados com sucesso");
    } catch (err) {
        console.log(err.message)
    }
})

//---------------- pokemon ----------------
//adicionar pokemon
app.post('/pokemons', async (req, res) => {
    try {
        const { pokemonSearchName, pokemonSprite, nomesTipos } = req.body;

        const newPokemon = await pool.query(
            "INSERT INTO pokemons (name, image_url, attribute) VALUES ($1, $2, $3) RETURNING *", [ pokemonSearchName, pokemonSprite, nomesTipos ]
        )
        //receber como resposta em json
        res.json(newPokemon.rows[0]);
    } catch (err) {
        console.log(err.message)
    }
});

//criar ligação entre pokemon e treinador
app.post('/pokemons/trainer', async (req, res) => {
    try {
        const { pokemonSearchName, pokemonSprite, nomesTipos } = req.body;

        const newPokemon = await pool.query(
            "INSERT INTO pokemons (name, image_url, attribute) VALUES ($1, $2, $3) RETURNING *", [ pokemonSearchName, pokemonSprite, nomesTipos ]
        )
        //receber como resposta em json
        res.json(newPokemon.rows[0]);
    } catch (err) {
        console.log(err.message)
    }
});

//pegar todos os pokemons de um user
app.get('/pokemons/trainer/:trainerid', async (req, res) => {
    try {
        const { trainerid } = req.params;
        const pokemonsTrainer = await pool.query(
            //"SELECT name, image_url, attribute FROM pokemons, trainers, trainer_pokemons WHERE trainers.trainer_id = $1 AND pokemons.pokemon_id = trainer_pokemons.pokemon_id AND trainers.trainer_id = trainer_pokemons.trainer_id", [trainerid]
            "SELECT * FROM trainer_pokemons"
        )
        res.json(pokemonsTrainer.rows)
    } catch (err) {
        console.log(err.message)
    }
});

//pegar dados de um pokemon específico
app.get('/pokemons/:pokeid', async (req, res) => {
    try {
        const { pokeid } = req.params;
        const pokemon = await pool.query(
            "SELECT * FROM pokemons WHERE pokemon_id = $1", [ pokeid ]
        );

        res.json(pokemon.rows[0]);
    } catch (err) {
        console.log(err.message)
    }
});

//enviar um pokemon para o professor
app.delete('/pokemons/:pokeid', async (req, res) => {
    try {
        const { pokeid } = req.params;
        const deletePokemon = await pool.query(
            "DELETE FROM pokemons WHERE pokemon_id = $1", [ pokeid ]
        );
        res.json("Pokemon enviado com sucesso!")
    } catch (err) {
        console.log(err.message)
    }
})

// ----------------- limpar banco todos os pokemons -----------------
app.delete('/pokemons/clean', async (req, res) => {
    try {
        const deletePokemon = await pool.query(
            "DELETE FROM pokemons"
        );
        res.json("Pokemon enviado com sucesso!")
    } catch (err) {
        console.log(err.message)
    }
})

let port = 5000;
app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
});