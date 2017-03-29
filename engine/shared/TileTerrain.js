/**
 * TileTerrain - Represents a terrain tile.
 *
 * @param {type} name the name.
 * @param {type} texture the tileset texture.
 * @param {type} row the row number of the texture.
 * @param {type} column the column number of the texture.
 * @param {type} width the texture width.
 * @param {type} height the texture height.
 * @param {type} hasVariants true if the terrain has variants, false if not.
 * @param {type} foreign the foreign tile id (optional).
 */
function TileTerrain(name, texture, row, column, width, height, hasVariants, foreign)
{
    Tile.call(this, name, texture, row, column, width, height);

    this.hasVariants = hasVariants;
    this.foreign = foreign;
}

/**
 * TileTerrain.prototype.getVariant - Gets the current terrain variant.
 *
 * @param {type} game the game context in which to look up surroundings.
 * @param {type} layer the current layer number.
 * @param {type} row the current row number.
 * @param {type} column the current column number.
 * @returns {type} the variant.
 */
TileTerrain.prototype.getVariant = function(game, layer, row, column)
{
    var variant = 0;
    if(this.hasVariants)
    {
        var surroundings =
        [
            [game.world.getLayerData(layer, row - 1, column - 1), game.world.getLayerData(layer, row - 1, column), game.world.getLayerData(layer, row - 1, column + 1)],
            [game.world.getLayerData(layer, row, column - 1), game.world.getLayerData(layer, row, column), game.world.getLayerData(layer, row, column + 1)],
            [game.world.getLayerData(layer, row + 1, column - 1), game.world.getLayerData(layer, row + 1, column), game.world.getLayerData(layer, row + 1, column + 1)]
        ]

        /**
         * Vérification des cases du haut.
         */
        if(surroundings[0][1] == this.foreign)
        {
            variant = 6;
        }
        else if(surroundings[0][1] == 0)
        {
            variant = 21;
        }
        else
        {
            if(surroundings[0][0] == this.foreign)
            {
               variant = 9;
            }
            else if(surroundings[0][0] == 0)
            {
                variant = 19;
            }

            if(surroundings[0][2] == this.foreign)
            {
               variant = 8;
            }
            else if(surroundings[0][2] == 0)
            {
                variant = 18;
            }
        }

        /**
         * Vérification des cases du bas.
         */
        if(surroundings[2][1] == this.foreign)
        {
            variant = 16;
        }
        else if(surroundings[2][1] == 0)
        {
            variant = 31;
        }
        else
        {
            if(surroundings[2][0] == this.foreign)
            {
                variant = 4;
            }
            else if(surroundings[2][0] == 0)
            {
                variant = 14;
            }

            if(surroundings[2][2] == this.foreign)
            {
                variant = 3;
            }
            else if(surroundings[2][2] == 0)
            {
                variant = 13;
            }
        }

        /**
         * Vérification des cases de gauche.
         */
        if(surroundings[1][0] == this.foreign)
        {
            variant = 10;

            if(surroundings[0][1] == this.foreign)
            {
                variant = 5;
            }

            if(surroundings[2][1] == this.foreign)
            {
                variant = 15;
            }
        }
        else if(surroundings[1][0] == 0)
        {
            variant = 25;

            if(surroundings[0][1] == 0)
            {
                variant = 20;
            }

            if(surroundings[2][1] == 0)
            {
                variant = 30;
            }
        }

        /**
         * Vérification des cases de droite.
         */
        if(surroundings[1][2] == this.foreign)
        {
            variant = 12;

            if(surroundings[0][1] == this.foreign)
            {
                variant = 7;
            }

            if(surroundings[2][1] == this.foreign)
            {
                variant = 17;
            }
        }
        else if(surroundings[1][2] == 0)
        {
            variant = 27;

            if(surroundings[0][1] == 0)
            {
                variant = 22;
            }

            if(surroundings[2][1] == 0)
            {
                variant = 32;
            }
        }
    }

    var sprite =
    {
        x: this.sprite.x + Math.floor(variant % 5) * this.sprite.width,
        y: this.sprite.y + Math.floor(variant / 5) * this.sprite.height,
        width: this.sprite.width,
        height: this.sprite.height
    }

    return sprite;
}
