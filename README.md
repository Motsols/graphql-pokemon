<p align="center">
  <img src="https://github.com/lucasbento/graphql-pokemon/raw/master/content/logo.png">
</p>

<h1 align="center">GraphQL Pokémon</h1>

**3 minute setup** then start learning!

Get a lot more insight into how a GraphQL server works in just one hour with this very simple and intuitive hands-on tutorial.

## Try it out!
1. `npm install -g yarn@berry`
2. `yarn` (you may need to run CLI as administrator on windows)
3. `yarn run watch`  
4. [Install GraphQL Playground or use the web demo](https://github.com/prisma-labs/graphql-playground)
5. Enter `http://localhost:5000/` in Playground
6. Paste this query and run it
```graphql
{
  pokemons(first: 3) {
    id
    number
    weight {
      minimum
      maximum
    }
  }
}
```   

It is as simple as that!

## Short intro to GraphQL
What you just did was to use a Query (idempotent) which was specified in the GraphQL Schema and as a Type.  
In the playground, click on Schema- and Docs-buttons on the far right to see the different types in this project. You can also explore what's available with `ctrl+space`.  

A schema is built up on Types. The query returns a result Type (class) with properties that are of Types that can be built in (String, Int) or custom (Pokemon, Attack).  
As you type the editor will suggest the fields you can use, as also shown in the Docs panel to the right.  

## This project structure
GraphQL is only a layer on top of your domain logic, just like other APIs, which you will see demonstrated here.

The perks here is that there is a Schema, Queries (instead of endpoints), GraphQLTypes which are exposed (`GraphQLString`, `GraphQLInt`, `GraphQLList(GraphQLString)` or custom types such as `PokemonType`)

In code you will find the schema in `schema.js` which for now only contains queries which do the Read in CRUD. In real life this is where you would also add mutations which are Create, Update ad Delete in CRUD.

The actual queries themselves are found in `/type/QueryType.js` which specify return types (of GraphQLTypes as examples show above), arguments in (also of GraphQLTypes) and how to resolve the query. 

The data source is a simple json which is found in `/pokemons/pokemons.json`.

In `/type/PokemonType` we map the properties on an object from what is in the data source to the fields in the PokemonType. The PokemonType is something GraphQL understands and can work with.

As you may have understood by now this is a very simple project, which is exactly what we need. GraphQL is only a layer upon you domain logic so whenever you see a resolver in QueryType, this is actually where your domain logic will be called, or a database, or a separate API, or a mix of all of them. As most other APIs, you can place it on top of most other things.

## Tasks
To get hands on experience, I have written some highly critical tasks below for you to complete. It should take about an hour to solve these and afterwards you will be well on your way to be the next Proffessor Oak. Plus you will actually have learned something.

### 1. Add name
Seeing id and number is nice, but I can't remember the name so let's put that in there as well.  
Go to `/src/type/PokemonType.js` and add Name as a field in the PokemonType. Hint: the type is the built-in `GraphQLString`. The web page will very quickly update with the added field.  

When done add `name` to the query
```graphql
{
  pokemons(first: 3) {
    id
    name
    number
    weight {
      minimum
      maximum
    }
  }
}
```
### 2. Add resistances and maxCP
This is still very basic information. Add some more information about resistances (similar to types) and MaxCP (similar to maxHP).  

Now ask for this in the query as well.  
```graphql
{
  pokemons(first: 3) {
    id
    name
    number
    weight {
      minimum
      maximum
    }
    resistances
    maxCP
  }
}
```

### 3. Add recursive-ish pokémons  
Sometimes the data we request needs to be resolved from the data source again. When we ask for the first 3 pokemons, nothing special happends. We just display the properties. If we also add information about the evolutions (as PokemonType) we do something more advanced which normally would mean using a Data Loader.  

Any time we open new brackets we potentially need to fetch more data from the server. In our case, a Pokemon knows how to fetch it's own data, and when a pokemon has a list of evolutions (Pokemons) it will need to ge those as well but that is done in a batch to avoid n+1 issues.  

For our simple demo the resolving Data Loader is nothing more than calling getPokemonByEvolutions(obj.evolutions) to return the evolutions. With very little work we have now enabled recursive-ish queries for pokemon.  

Try it out with Bulbasaur!
```graphql
{
  pokemons(first: 1) {
    id
    name
    number
    evolutions {
      id
      name
      number
      evolutions {
        id
        name
        number
      }
    }
  }
}
```

### 4. Create a new query and service
There is a very big demand to find Pokémons by type.

Implement a new service that finds pokémons by type instead of ID, name or first.

To make this available as a query you need to add it as a new query in QueryType. Choose a name for it and specify return type, arguments in, and the resolver which will use your new service

### 5. Experiment more!
This is a quick look at how a GraphQL server works.

There is more data available in `/src/pokemons/pokemons.js` which can be exposed or make up some more information that uses a data loader.  

You can also try making a Mutation (unlike Query this edits data). Now you can make Pikachu into a water Pokémon!

## Awards
I hereby award you the titles of GraphQL-developer and querier ([it is a word](https://english.stackexchange.com/questions/214204/what-is-the-proper-way-to-say-queryer)).  
Congrats, you have earned it!

## Disclaimer

Thanks to the original creators of this repo!

I added basic GraphQL information complete with tasks to perform on top of their work. These changes were made to share GraphQL knowledge to my curious colleagues at [Cygni](https://cygni.se/) and strangers who may find this fork to their liking.

Give me a star if you liked this hands-on tutorial.