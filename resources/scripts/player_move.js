new Behaviour("player_move", function(object)
{
    object.x += Input.get(68) - Input.get(81);
    object.y += Input.get(83) - Input.get(90);
});
