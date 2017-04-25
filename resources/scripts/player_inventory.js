Behaviour.set("player_inventory", function(delay, object, game)
{
    if(!object.inventory[0])
    {
        object.inventory[0] = 1;
        object.inventory[1] = 1;
        object.inventory[2] = 1;
        object.inventory[3] = 1;
        object.inventory[4] = 1;
        object.inventory[5] = 1;
        object.inventory[6] = 1;
        object.inventory[7] = 1;
    }

    object.inventoryCursor = (object.inventoryCursor != undefined) ? object.inventoryCursor : 0;
    object.inventoryCursorOffset = (object.inventoryCursorOffset != undefined) ? object.inventoryCursorOffset : 0;

    var refresh = false;

    var height = 1;
    var paddingItem = 47;
    var heightItem = 45;
    var selectorOffset = 0;
    var selectorMax = 7;

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
        if(object.isInInventory && object.inventory && object.inventory.length > 0 && object.inventoryCursor >= object.inventoryCursorOffset)
        {
            if(up && (object.inventoryCursor - 1) >= 0)
            {
                object.inventoryCursor--;

                if((object.inventoryCursor) < object.inventoryCursorOffset)
                {
                    object.inventoryCursorOffset--;
                    refresh = true;
                }
            }
            else if(down && (object.inventoryCursor + 1) < Object.keys(object.inventory).length)
            {
                object.inventoryCursor++;

                if((object.inventoryCursor) >= selectorMax + object.inventoryCursorOffset)
                {
                    object.inventoryCursorOffset++;
                    refresh = true;
                }
            }
        }

        game.guiLayout.clearHeight(height + 1);

        if((e && !object.interaction) || refresh)
        {
            for(var interaction of game.world.interactions)
            {
                if(interaction.type == "inventory")
                {
                    if(!object.isInInventory || refresh)
                    {
                        game.guiLayout.clearHeight(height);
                        game.guiLayout.add(height, "inventory", positionOnScreen, "Inventory" + " ".repeat(8) + Utils.pad(object.budget, 6) + "$");

                        var i = 0;
                        for(var index in object.inventory)
                        {
                            if(i >= object.inventoryCursorOffset && i < selectorMax + object.inventoryCursorOffset)
                            {
                                var item = game.items[index];
                                var positionOnScreenItem =
                                {
                                    x: positionOnScreen.x,
                                    y: positionOnScreen.y + paddingItem + (i - object.inventoryCursorOffset) * heightItem,
                                    fixed: true
                                };

                                var positionOnScreenText =
                                {
                                    x: positionOnScreen.x + 186,
                                    y: positionOnScreen.y + paddingItem + (i - object.inventoryCursorOffset) * heightItem,
                                    fixed: true
                                };

                                game.guiLayout.add(height, "inventory_item", positionOnScreenItem, item.name);
                                game.guiLayout.add(height, "text", positionOnScreenText, "x" + Utils.pad(object.inventory[index], 2));
                            }

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
                    y: positionOnScreen.y + 55 + (object.inventoryCursor - object.inventoryCursorOffset) * heightItem,
                    fixed: true
                };

                game.guiLayout.add(height + 1, "inventory_selector", positionOnScreenCursor, "");
            }
        }
    }
});
