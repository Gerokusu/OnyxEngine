Behaviour.set("player_inventory", function(delay, object, game)
{
    var e = Input.getOnce(73);
    if(e)
    {
        if(!object.interaction)
        {
            console.log("Open inventory");
        }
    }
});
