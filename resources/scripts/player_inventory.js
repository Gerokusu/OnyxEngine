Behaviour.set("player_inventory", function(delay, object, game)
{
    var e = Input.getOnce(73);
    if(e)
    {
        if(!object.interaction)
        {
            var height = 1;
            for(var interaction of game.world.interactions)
            {
                if(interaction.type == "inventory")
                {
                    if(!object.isInInventory)
                    {
                        var positionOnScreen =
                        {
                            x: Math.floor(game.canvas.width - 256),
                            y: Math.floor(0),
                            fixed: true
                        };

                        game.guiLayout.clearHeight(height);
                        game.guiLayout.add(height, "inventory", positionOnScreen, "Inventory");

                        object.isInInventory = true;
                        object.translation.slowed = 1;
                    }
                    else
                    {
                        game.guiLayout.clearHeight(height);

                        object.isInInventory = false;
                        object.translation.slowed = 0;
                    }
                }
            }
        }
    }
});
