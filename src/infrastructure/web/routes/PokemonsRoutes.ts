import express from "express";
import {
  getPokemonById,
  getAllPokemons,
  getRandomPokemons,
} from "@/infrastructure/web/controllers/PokemonsController";
import { idChecker, setChecker } from "@/middlewares/paramChecker";

const router = express.Router();

/**
 * @swagger
 * /pokemons:
 *  get:
 *   summary: Get all pokemons
 *   description: Get all pokemons
 *   responses:
 *   200:
 *     description: Success
 *     content:
 *       application/json:
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The pokemon ID
 *                 example: 1
 *               name:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *                   description: The pokemon name in different languages
 *                 example:
 *                   english: pikachu
 *                   japanese: ピカチュウ
 *               type:
 *                 type: array
 *                 description: The pokemon type
 *                 example: ["electric", "fairy"]
 *               base:
 *                 type: object
 *                 properties:
 *                   HP:
 *                     type: integer
 *                     description: The pokemon HP
 *                     example: 35
 *                   attack:
 *                     type: integer
 *                     description: The pokemon attack
 *                     example: 55
 *                   defense:
 *                     type: integer
 *                     description: The pokemon defense
 *                     example: 40
 *                   sp_attack:
 *                     type: integer
 *                     description: The pokemon special attack
 *                     example: 50
 *                   sp_defense:
 *                     type: integer
 *                     description: The pokemon special defense
 *                     example: 50
 *                   speed:
 *                     type: integer
 *                     description: The pokemon speed
 *                     example: 90
 */
router.get("/", getAllPokemons);

/**
 * @swagger
 * /pokemons/{id}:
 *  get:
 *   summary: Get a pokemon by ID
 *   description: Get a pokemon by ID
 *   parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     description: The ID of the pokemon
 *     schema:
 *       type: integer
 *   responses:
 *   200:
 *     description: Success
 *     example:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The pokemon ID
 *               example: 1
 *             name:
 *               type: object
 *               additionalProperties:
 *                 type: string
 *                 description: The pokemon name in different languages
 *               example:
 *                 english: pikachu
 *                 japanese: ピカチュウ
 *             type:
 *               type: array
 *               description: The pokemon type
 *               example: ["electric", "fairy"]
 *             base:
 *               type: object
 *               properties:
 *                 HP:
 *                   type: integer
 *                   description: The pokemon HP
 *                   example: 35
 *                 attack:
 *                   type: integer
 *                   description: The pokemon attack
 *                   example: 55
 *                 defense:
 *                   type: integer
 *                   description: The pokemon defense
 *                   example: 40
 *                 sp_attack:
 *                   type: integer
 *                   description: The pokemon special attack
 *                   example: 50
 *                 sp_defense:
 *                   type: integer
 *                   description: The pokemon special defense
 *                   example: 50
 *                 speed:
 *                   type: integer
 *                   description: The pokemon speed
 *                   example: 90
 */
router.get("/:id", idChecker, getPokemonById);

/**
 * @swagger
 * /pokemons/random/set:
 *  get:
 *   summary: Get a set of random pokemons
 *   description: Get a set of random pokemons
 *   parameters:
 *   - in: query
 *     name: set
 *     required: true
 *     description: The number of random pokemons to retrieve
 *     schema:
 *       type: integer
 *   responses:
 *   200:
 *     description: Success
 *     example:
 *       application/json:
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The pokemon ID
 *                 example: 1
 *               name:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *                   description: The pokemon name in different languages
 *               example:
 *                 english: pikachu
 *                 japanese: ピカチュウ
 *               type:
 *                 type: array
 *                 description: The pokemon type
 *                 example: ["electric", "fairy"]
 *               base:
 *                 type: object
 *                 properties:
 *                   HP:
 *                     type: integer
 *                     description: The pokemon HP
 *                     example: 35
 *                   attack:
 *                     type: integer
 *                     description: The pokemon attack
 *                     example: 55
 *                   defense:
 *                     type: integer
 *                     description: The pokemon defense
 *                     example: 40
 *                   sp_attack:
 *                     type: integer
 *                     description: The pokemon special attack
 *                     example: 50
 *                   sp_defense:
 *                     type: integer
 *                     description: The pokemon special defense
 *                     example: 50
 *                   speed:
 *                     type: integer
 *                     description: The pokemon speed
 *                     example: 90
 */
router.get("/randoms/:set", setChecker, getRandomPokemons);

export default router;
