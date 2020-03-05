import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import {
  fromGlobalId,
} from 'graphql-relay';

import PokemonType from './PokemonType';

import {
  getPokemons,
  getPokemonById,
  getPokemonByName,
} from '../service/Pokemon';


const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Query any Pokémon by number or name',
  fields: () => ({
    query: {
      type: QueryType,
      resolve: (...args) => args,
    },
    pokemons: { // This is the query for pokemons(first: 3)
      type: new GraphQLList(PokemonType), // Returns a list of Pokémon, of the custom type PokemonType
      args: {
        first: {
          type: new GraphQLNonNull(GraphQLInt), // GraphQLNotNull makes it required
        },
      },
      resolve: async (obj, args) => await getPokemons(args),
    },
    pokemon: { // Query for pokemon(id: 1) and pokemon(name: Charmander)
      type: PokemonType, // Returns A Pokemon
      args: { // This has two possible inputs, and at least one of them must be set
        id: {
          type: GraphQLString, // This is one of several built-in basic types
        },
        name: {
          type: GraphQLString,
        },
      },
      resolve: async (obj, { id, name }) => {
        if (id) {
          return await getPokemonById(fromGlobalId(id).id);
        }

        if (name) {
          return await getPokemonByName(name);
        }

        throw new Error(
          'You need to specify either the ID or name of the Pokémon'
        );
      },
    },
  }),
});

export default QueryType;
