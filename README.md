<p align="center">
  <img src="https://github.com/lucasbento/graphql-pokemon/raw/master/content/logo.png">
</p>

<h1 align="center">GraphQL Pokémon</h1>

**5 minute setup** then start learning!

Get a lot more insight into how a GraphQL server works in just one hour with this very simple and intuitive example.


## Try it out!
1. `npm install -g yarn@berry`
2. `yarn` (run command tool as administrator on windows)
3. `yarn run watch`  
4. [Install GraphQL Playground (recommended) or use the web demo](https://github.com/prisma-labs/graphql-playground)
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

## Short intro to GraphQL
What you just did was to use a Query (idempotent) which was specified in the GraphQL Schema and as a Type.  
In the playground, click on Schema- and Docs-buttons on the far right to see the different types in this project. You can also explore what's available with `ctrl+space`.  
A schema is built up on Types. The query returns a result Type (class) with properties that are of Types that can be built in (String, Int) or custom (Pokemon, Attack).  
As you type the editor will suggest the fields you can use, as also shown in the Docs panel to the right.  

In code you will find the schema in the folder `Schema` and the unerlying Types in the folder `Type`.  
To test actually using it, carry on with the tasks below.

## Tasks
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

### 3. Add recursive pokémons  
Sometimes the data we request needs to be resolved from the data source again. When we ask for the first 3 pokemons, nothing special happends. We just display the properties. If we also add information about the evolutions (as PokemonType) we do something more advanced which normally would mean using a Data Loader.  

Any time we open new brackets we potentially need to fetch more data from the server. In our case, a Pokemon knows how to fetch it's own data, and when a pokemon has a list of evolutions (Pokemons) it will need to ge those as well but that is done in a batch to avoid n+1 issues.  

For our simple demo the resolving Data Loader is nothing more than calling getPokemonByEvolutions(obj.evolutions) to return the evolutions. With very little work we have now enabled recursive queries for pokemon.  

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

### 4. Experiment more!
This is a quick look at how a GraphQL server works.

There is more data available in `/src/pokemons/pokemons.js` which can be exposed or make up some more information that uses a data loader.  

You can also try making a Mutation (unlike Query this edits data). Now you can make Pikachu into a water Pokémon!

## Disclaimer

This was built as part of a talk on Relay & GraphQL at [@ReactSP](https://meetup.com/pt-BR/ReactJS-SP) meetup, check us out, we build cool stuff. ;)

## Related Projects

* [Pokemon Gopher](https://github.com/racerxdl/pokemon-gopher) - Fetch information about pokémons with #graphql and #go 🙂
