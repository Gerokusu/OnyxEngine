new Behaviour("player_move", function(object, delay)
{
    object.x += (Input.get(68) - Input.get(81)) * delay * 4;
    object.y += (Input.get(83) - Input.get(90)) * delay * 4;
});
