Behaviour.set("player_move", function(object, delay)
{
    var startPosition =
    {
        x: object.position.x,
        y: object.position.y
    };

    move(Input.get(68) - Input.get(81), Input.get(83) - Input.get(90), 4);

    function move(dx, dy, speed)
    {
        var startAnimation = object.animator.animation;

        if(dy < 0)
        {
            object.animator.animation = "character_walk_top";
            object.orientation = "top";
        }
        else if(dx > 0)
        {
            object.animator.animation = "character_walk_right";
            object.orientation = "right";
        }
        else if(dy > 0)
        {
            object.animator.animation = "character_walk_bottom";
            object.orientation = "bottom";
        }
        else if(dx < 0)
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

        object.animator.state += (delay * speed);
    }

    /*
    object.position.x += (Input.get(68) - Input.get(81)) * delay * 4;
    object.position.y += (Input.get(83) - Input.get(90)) * delay * 4;

    var dx = 0;
    var dy = 0;
    if(Math.floor(object.position.x) > Math.floor(positionStart.x))
    {
        dx = 1;
        object.animator.animation = "character_walk";
    }
    else if(Math.floor(object.position.x) < Math.floor(positionStart.x))
    {
        dx = -1;
        object.animator.animation = "character_walk";
    }
    else if(Math.floor(object.position.y) > Math.floor(positionStart.y))
    {
        dy = 1;
        object.animator.animation = "character_walk";
    }
    else if(Math.floor(object.position.y) < Math.floor(positionStart.y))
    {
        dy = -1;
        object.animator.animation = "character_walk";
    }
    */
    //TODO ANIMATIONS
    // for
});
