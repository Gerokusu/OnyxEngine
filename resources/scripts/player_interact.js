Behaviour.set("player_interact", function(delay, object, game)
{
    var positionStart =
    {
        x: Math.floor(object.position.x),
        y: Math.floor(object.position.y)
    }

    var positionFront =
    {
        x: positionStart.x,
        y: positionStart.y
    }

    switch(object.orientation)
    {
        case "top":
            positionFront.y -= 1;
        break;

        case "right":
            positionFront.x += 1;
        break;

        case "bottom":
            positionFront.y += 1;
        break;

        case "left":
            positionFront.x -= 1;
        break;
    }

    var state = object.interaction;
    if(state == undefined)
    {
        object.interaction = 0;
    }

    var e = Input.getOnce(69);
    if(e)
    {
        var id = game.world.getLayerInteraction(positionFront.y, positionFront.x);
        if(id)
        {
            var interaction = game.world.getInteraction(id, "e");
            if(interaction)
            {
                var height = 0;
                if(object.interaction < interaction.value.length)
                {
                    var positionOnScreen =
                    {
                        x: Math.floor(game.world.units.width * positionFront.x + game.world.units.width / 2),
                        y: Math.floor(game.world.units.height * positionFront.y - game.world.units.height / 2),
                        align: "center",
                        fixed: false
                    };

                    game.guiLayout.clearHeight(height);
                    game.guiLayout.add(height, "dialog", positionOnScreen, interaction.value[object.interaction]);

                    object.interaction++;
                    object.translation.slowed = 1;
                }
                else
                {
                    game.guiLayout.clearHeight(height);

                    object.interaction = 0;
                    object.translation.slowed = 0;
                }
            }
        }
    }
});
