![image](https://user-images.githubusercontent.com/55772578/135903253-8d56d701-dc4b-4e18-9318-383aa0a14b72.png)

# PokeTrainers

## Descrição do Projeto
<p align="center">Mantenha sua jornada pokemon na palma da sua mão com o PokeTrainers! Uma pokedex customizada para que tenha seus pokemons e sua história na palma da sua mão.</p>

<div display="inline-block" align="center">
    <img src="https://img.shields.io/static/v1?label=React&message=17.0.2&color=61DAFB&style=for-the-badge&logo=React"/>
    <img src="https://img.shields.io/static/v1?label=Next.js&message=11.1.2&color=000000&style=for-the-badge&logo=Next.js"/>
    <img src="https://img.shields.io/static/v1?label=Express&message=^4.17.1&color=000000&style=for-the-badge&logo=Express"/>
    <img src="https://img.shields.io/static/v1?label=PostgreSQL&message=^8.7.1&color=4169E1&style=for-the-badge&logo=PostgreSQL"/>
    <img src="https://img.shields.io/static/v1?label=Sequelize&message=^6.6.5&color=52B0E7&style=for-the-badge&logo=Sequelize"/>
</div>

<p id="objetivo" align="center">
    O objetivo de fazer o desafio é também o motivo pelo qual o desafio foi lançado, aprender e entender mais sobre banco de dados relacional, bem como, pra mim, treinar conceitos do front end e uma coisa meio diferente do meu comum. 
</p>

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [React](https://pt-br.reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Express](http://expressjs.com/)
- [Cors](http://expressjs.com/en/resources/middleware/cors.html)
- [PostgreSQL](https://www.postgresql.org/)
- [Sequelize](https://sequelize.org/)

### Features

- [x] Cadastro de treinador
- [x] Cadastro de pokemon
- [x] Relação entre treinador e pokemon

![image](https://user-images.githubusercontent.com/55772578/135930082-c9116ab2-4dd8-4948-aceb-080d346371b2.png)

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Back End (Servidor)

```bash
# Clone este repositório
$ git clone <https://github.com/TheSupereor/he4rtlabs-C4--poketrainers>

# Acesse a pasta do projeto no terminal/cmd
$ cd he4rtlabs-C4--poketrainers

# Vá para a pasta server
$ cd server

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor iniciará na porta:5000 - acesse <http://localhost:5000>
```

### 🎲 Rodando o Front End (Client-side)

```bash
# Clone este repositório
$ git clone <https://github.com/TheSupereor/he4rtlabs-C4--poketrainers>

# Acesse a pasta do projeto no terminal/cmd
$ cd he4rtlabs-C4--poketrainers

# Vá para a pasta server
$ cd client-side/poketrainers

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O cliente iniciará na porta:3000 - acesse <http://localhost:3000>
```

## Pensamentos iniciais

Inicialmente pensei em fazer algo mais diferente, algo como "crie sua própria história pokemon", onde você poderia adicionar pokemons, itens e uma história própria para si. Todavia vi, com o tempo, que isso ia divergir demais do desafio inicial estabelecido, por isso há uma secção "Mochila.js" e css's relacionados, mas que ficaram de fora. Fazer dessa forma iria mudar um tanto a forma que o banco de dados iria funcionar, mas seria simples de implementar também. Talvez ainda faça algum dia, em uma versão melhor ainda, podendo coletar insígnias e coisas assim, mas por enquanto deixarei essa belezinha assim.

É isso, obrigado!

---

#Proposta do desafio:
    
# Projeto 004 - Try Catch 'Em all 

Pokedéx boladona pra você pegar todos os pokemões do planeta (que você cadastrar)

## Qual é o valor que o desafio entrega?

O projeto tem a finalidade de descrever alguns fatores determinantes para você melhorar sua ideia de banco de dados relacional, consumo de API's e integração.

1. Relações Pertencem à Muitos (BelongsToMany)

    Quando você tem duas tabelas e você quer relacionalas com duas chaves "primárias", você usa a relação BelongsToMany.

2. Consumo de API de terceiros

   Você irá fazer uma classe (Service) para consumir a API do [PokeApi.co](https://pokeapi.co) e aprender sobre CURL.

3. Projeto Fullstack

    Deverá ser uma aplicação com Front e Back-end, onde você deverá julgar como separar essa arquitetura.

### Desafio

Faça uma aplicação (com ou sem autenticação) onde você poderá ter um registro global de pokémons, pegando dados da PokeApi para popular seu banco.

A ideia é você poder cadastrar treinadores e nesses treinadores você deverá vincular pokémons nos quais você quiser.

Modelo de tabelas sugerido: 

```
table: trainers
------
id: int primary key auto increment
name: string
region: string (Kanto, Johto, Hoenn, Sinnoh)
age: int


table: pokemons
------
id: int primary key auto increment
name: string
image_url: string 
attribute: string (lighning, ice, fire etc)

table: trainer_pokemons
------
trainer_id: int references id in trainers
pokemon_id int references id in pokemons
```

Cuidados a se tomar:

- Fazer um layout agradável e o plus de algo tematizado;
- Não ter pressa para terminar o projeto.

### Conclusão do Desafio

Commite as alterações feitas e faça um post ou no nosso Discord na sala #he4rtlabs-challenges ou um post no Twitter com a hashtag #He4rtLabsChallenges e iremos divulgar e/ou fazer um review do seu código.

Caso você se sinta confortável, deixamos um arquivo chamado REVIEW.MD para você fazer alguns comentários sobre o desafio e o que você achou no geral.

## Créditos

Este desafio foi desenvolvido pelo grupo He4rt Developers para uso livre da comunidade.

## Autor

- Daniel Reis (danielhe4rt) - Back-end Developer && He4rt Developers Leader - [Portfólio](https://danielheart.dev) - [Twitter](https://twitter.com/danielhe4rt)
