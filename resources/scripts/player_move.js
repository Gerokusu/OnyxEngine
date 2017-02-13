Behaviour.set("player_move", function(object, delay)
{
    var translation =
    {
        dx: Input.get(68) - Input.get(81),
        dy: Input.get(83) - Input.get(90),
        speed: 4
    }

    var startAnimation = object.animator.animation;

    if(translation.dy < 0)
    {
        object.animator.animation = "character_walk_top";
        object.orientation = "top";
    }
    else if(translation.dx > 0)
    {
        object.animator.animation = "character_walk_right";
        object.orientation = "right";
    }
    else if(translation.dy > 0)
    {
        object.animator.animation = "character_walk_bottom";
        object.orientation = "bottom";
    }
    else if(translation.dx < 0)
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

    if(startAnimation != object.animator.animation)
    {
        object.animator.state = 0;
    }

    object.position.x += (delay * translation.dx * translation.speed);
    object.position.y += (delay * translation.dy * translation.speed);
    object.animator.state += (delay * translation.speed);
});
