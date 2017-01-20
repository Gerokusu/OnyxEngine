function TileTerrain(primary, secondary, texture, hasVariants, row, column, width, height)
{
    Tile.call(this, primary, texture, row, column, width, height);
    this.secondary = secondary;
    this.hasVariants = hasVariants;
}

TileTerrain.prototype.getVariant = function(game, layer, row, column, idSecondary)
{
    var variant = 0;
    if(this.hasVariants)
    {
        var surroundings =
        [
            [game.getWorld(layer, row - 1, column - 1), game.getWorld(layer, row - 1, column), game.getWorld(layer, row - 1, column + 1)],
            [game.getWorld(layer, row, column - 1), game.getWorld(layer, row, column), game.getWorld(layer, row, column + 1)],
            [game.getWorld(layer, row + 1, column - 1), game.getWorld(layer, row + 1, column), game.getWorld(layer, row + 1, column + 1)]
        ]

        /**
         * Vérification des cases du haut.
         */
        if(surroundings[0][1] == idSecondary)
        {
            variant = 6;
        }
        else if(surroundings[0][1] == 0)
        {
            variant = 21;
        }
        else
        {
            if(surroundings[0][0] == idSecondary)
            {
               variant = 9;
            }
            else if(surroundings[0][0] == 0)
            {
                variant = 19;
            }

            if(surroundings[0][2] == idSecondary)
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
        if(surroundings[2][1] == idSecondary)
        {
            variant = 16;
        }
        else if(surroundings[2][1] == 0)
        {
            variant = 31;
        }
        else
        {
            if(surroundings[2][0] == idSecondary)
            {
                variant = 4;
            }
            else if(surroundings[2][0] == 0)
            {
                variant = 14;
            }

            if(surroundings[2][2] == idSecondary)
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
        if(surroundings[1][0] == idSecondary)
        {
            variant = 10;

            if(surroundings[0][1] == idSecondary)
            {
                variant = 5;
            }

            if(surroundings[2][1] == idSecondary)
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
        if(surroundings[1][2] == idSecondary)
        {
            variant = 12;

            if(surroundings[0][1] == idSecondary)
            {
                variant = 7;
            }

            if(surroundings[2][1] == idSecondary)
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
