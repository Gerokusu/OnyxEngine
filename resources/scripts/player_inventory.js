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

                        var money = "000000" + object.budget;
                        var padding = " ".repeat(8);

                        game.guiLayout.clearHeight(height);
                        game.guiLayout.add(height, "inventory", positionOnScreen, "Inventory" + padding + money.substr(money.length - 6) + "$");

                        for(var item of object.inventory)
                        {
                            console.log(item.name);
                        }

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
