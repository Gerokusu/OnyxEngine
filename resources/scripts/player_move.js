Behaviour.set("player_move", function(object, delay)
{
    var positionStart =
    {
        x: object.position.x,
        y: object.position.y
    }

    object.translation.dx = object.translation.dx != 0 ? object.translation.dx : Input.get(68) - Input.get(81);
    object.translation.dy = object.translation.dy != 0 ? object.translation.dy : Input.get(83) - Input.get(90);
    object.translation.speed = 4;

    var animationStart = object.animator.animation;
    if(object.translation.dy < 0)
    {
        object.animator.animation = "character_walk_top";
        object.orientation = "top";
    }
    else if(object.translation.dx > 0)
    {
        object.animator.animation = "character_walk_right";
        object.orientation = "right";
    }
    else if(object.translation.dy > 0)
    {
        object.animator.animation = "character_walk_bottom";
        object.orientation = "bottom";
    }
    else if(object.translation.dx < 0)
    {
        object.animator.animation = "character_walk_left";
        object.orientation = "left";
    }
    else
    {
        switch (object.orientation)
        {
            case "top":
                object.animator.animation = "character_idle_top";
            break;

            case "right":
                object.animator.animation = "character_idle_right";
            break;

            case "bottom":
                object.animator.animation = "character_idle_bottom";
            break;

            case "left":
                object.animator.animation = "character_idle_left";
            break;

            default:
                object.animator.animation = "character_idle_bottom";
            break;

        }
    }

    if(animationStart != object.animator.animation)
    {
        object.animator.state = 0;
    }

    object.position.x += (delay * object.translation.dx * object.translation.speed);
    object.position.y += (delay * object.translation.dy * object.translation.speed);
    object.animator.state += (delay * object.translation.speed);

    if(Math.floor(positionStart.x) != Math.floor(object.position.x))
    {
        object.translation.dx = 0;
    }

    if(Math.floor(positionStart.y) != Math.floor(object.position.y))
    {
        object.translation.dy = 0;
    }
});
