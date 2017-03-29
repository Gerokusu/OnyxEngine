Behaviour.set("player_interact", function(delay, object, game)
{
    var positionStart =
    {
        x: Math.floor(object.position.x),
        y: Math.floor(object.position.y)
    }

    var positionFront =
    {
        x: 0,
        y: 0
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

    var e = Input.getOnce(69);
    if(e && game.world.getInteractionLayer(positionStart.y + positionFront.y, positionStart.x + positionFront.x) == 1)
    {
        console.log("INTERACTION !");
    }
});
