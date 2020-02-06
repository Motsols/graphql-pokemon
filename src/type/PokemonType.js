import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
} from 'graphql';
import {
  globalIdField,
} from 'graphql-relay';

import PokemonDimensionType from './PokemonDimensionType';
import PokemonAttackType from './PokemonAttackType';
import EvolutionRequirementType from './EvolutionRequirementType';

import { getPokemonByEvolutions } from '../service/Pokemon';

const PokemonType = new GraphQLObjectType({
  name: 'Pokemon',
  description: 'Represents a Pokémon',
  fields: () => ({
    id: globalIdField('Pokemon'),
    number: {
      type: GraphQLString,
      description: 'The identifier of this Pokémon',
      resolve: obj => `00${obj.id}`.slice(-3),
    },
    weight: {
      type: PokemonDimensionType,
      description: 'The minimum and maximum weight of this Pokémon',
      resolve: obj => obj.weight,
    },
    types: {
      type: new GraphQLList(GraphQLString),
      description: 'The type(s) of this Pokémon',
      resolve: obj => obj.types,
    },
    resistances: {
      type: new GraphQLList(GraphQLString),
      description: 'The type(s) of Pokémons that this Pokémon is resistant to',
      resolve: obj => obj.resistant,
    },
    attacks: {
      type: PokemonAttackType,
      description: 'The attacks of this Pokémon',
      resolve: obj => obj.attacks,
    },
    maxHP: {
      type: GraphQLInt,
      description: 'The maximum HP of this Pokémon',
      resolve: obj => obj.maxHP,
    },
  }),
});

export default PokemonType;
