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
        if(id != undefined)
        {
            var height = 0;
            var interaction = game.world.getInteraction(id, "e");
            if(interaction != undefined && object.interaction != undefined && object.interaction < interaction.value.length)
            {
                var text = "";
                switch(interaction.type)
                {
                    case "text":
                        text = interaction.value[object.interaction];
                    break;

                    case "money_add":
                        var amount = interaction.value[0];
                        text = "You have won " + amount + "$ !";
                        object.budget += amount;

                        game.world.setLayerInteraction(positionFront.y, positionFront.x, 0);
                    break;
                }

                var positionOnScreen =
                {
                    x: Math.floor(game.world.units.width * positionFront.x + game.world.units.width / 2),
                    y: Math.floor(game.world.units.height * positionFront.y - game.world.units.height / 2),
                    align: "center",
                    fixed: false
                };

                game.guiLayout.clearHeight(height);
                game.guiLayout.add(height, "dialog", positionOnScreen, text);

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
});
