Behaviour.set("player_move", function(delay, object, game)
{
    var positionStart =
    {
        x: object.position.x,
        y: object.position.y
    }

    var up = Input.get(90);
    var down = Input.get(83);
    var right = Input.get(68);
    var left = Input.get(81);

    //Récupération des contrôles utilisateurs
    object.translation.dx = object.translation.dx != 0 || up || down ? object.translation.dx : right - left;
    object.translation.dy = object.translation.dy != 0 || right || left ? object.translation.dy : down - up;
    object.translation.speed = 6;

    //Changement d'animations
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

    var l;
    var c;

    if(object.translation.dx >= 0)
    {
        c = Math.floor(object.position.x + object.translation.dx);
    }

    if(object.translation.dx < 0)
    {
        c = Math.ceil(object.position.x + object.translation.dx);
    }

    if(object.translation.dy >= 0)
    {
        l = Math.floor(object.position.y + object.translation.dy);
    }

    if(object.translation.dy < 0)
    {
        l = Math.ceil(object.position.y + object.translation.dy);
    }

    if(game.world.getCollisionLayer(l, c) == 0)
    {
        //Calcul de la position de destination en fonction du temps et de la vitesse de déplacement
        object.position.x += (delay * object.translation.dx * object.translation.speed);
        object.position.y += (delay * object.translation.dy * object.translation.speed);

        //Changement de case en axe x
        if(Math.floor(positionStart.x) < Math.floor(object.position.x))
        {
            object.position.x = Math.floor(object.position.x);
            object.translation.dx = 0;
        }
        else if(Math.ceil(positionStart.x) > Math.ceil(object.position.x))
        {
            object.position.x = Math.ceil(object.position.x);
            object.translation.dx = 0;
        }

        //Changement de case en axe y
        if(Math.floor(positionStart.y) < Math.floor(object.position.y))
        {
            object.position.y = Math.floor(object.position.y);
            object.translation.dy = 0;
        }
        else if(Math.ceil(positionStart.y) > Math.ceil(object.position.y))
        {
            object.position.y = Math.ceil(object.position.y);
            object.translation.dy = 0;
        }
    }
    else
    {
        object.translation.dx = 0;
        object.translation.dy = 0;
    }

    object.animator.state += (delay * object.translation.speed);
});
