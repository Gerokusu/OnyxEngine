Behaviour.set("player_inventory", function(delay, object, game)
{
    object.inventoryCursor = (object.inventoryCursor != undefined) ? object.inventoryCursor : 0;

    var height = 1;
    var paddingItem = 47;
    var heightItem = 45;

    var positionOnScreen =
    {
        x: Math.floor(game.canvas.width - 256),
        y: Math.floor(0),
        fixed: true
    };

    var e = Input.getOnce(73);
    var up = Input.getOnce(38);
    var down = Input.getOnce(40);
    if(e || up || down)
    {
        if(object.isInInventory && object.inventory && object.inventory.length > 0)
        {
            if(up && (object.inventoryCursor - 1) >= 0)
            {
                object.inventoryCursor--;
            }
            else if(down && (object.inventoryCursor + 1) < Object.keys(object.inventory).length)
            {
                object.inventoryCursor++;
            }
        }

        game.guiLayout.clearHeight(height + 1);

        if(e && !object.interaction)
        {
            for(var interaction of game.world.interactions)
            {
                if(interaction.type == "inventory")
                {
                    if(!object.isInInventory)
                    {
                        game.guiLayout.clearHeight(height);
                        game.guiLayout.add(height, "inventory", positionOnScreen, "Inventory" + " ".repeat(8) + Utils.pad(object.budget, 6) + "$");

                        var i = 0;
                        for(var index in object.inventory)
                        {
                            var item = game.items[index];
                            var positionOnScreenItem =
                            {
                                x: positionOnScreen.x,
                                y: positionOnScreen.y + paddingItem + i * heightItem,
                                fixed: true
                            };

                            var positionOnScreenText =
                            {
                                x: positionOnScreen.x + 186,
                                y: positionOnScreen.y + paddingItem + i * heightItem,
                                fixed: true
                            };

                            game.guiLayout.add(height, "inventory_item", positionOnScreenItem, item.name);
                            game.guiLayout.add(height, "text", positionOnScreenText, "x" + Utils.pad(object.inventory[index], 2));

                            i++;
                        }

                        object.isInInventory = true;
                        object.translation.slowed = 1;
                    }
                    else
                    {
                        game.guiLayout.clearHeight(height);
                        game.guiLayout.clearHeight(height + 1);

                        object.isInInventory = false;
                        object.translation.slowed = 0;
                    }
                }
            }
        }

        if(object.isInInventory)
        {
            if(Object.keys(object.inventory).length > 1)
            {
                var positionOnScreenCursor =
                {
                    x: positionOnScreen.x + 222,
                    y: positionOnScreen.y + 55 + object.inventoryCursor * heightItem,
                    fixed: true
                };

                game.guiLayout.add(height + 1, "inventory_selector", positionOnScreenCursor, "");
            }
        }
    }
});
