/**
 * GUI - Represents the GUI manager.
 *
 * @param  {type} id      the id.
 * @param  {type} texture the texture path.
 */
function GUI(id, texture, background, top, right, bottom, left, topleft, topright, bottomleft, bottomright)
{
    this.id = id;
    this.texture = new Texture("resources/gui/" + texture);
    this.background = background;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
    this.topleft = topleft;
    this.topright = topright;
    this.bottomleft = bottomleft;
    this.bottomright = bottomright;

}

/**
 * GUI.prototype.getSprites - Gets sprites in the correct order (top, right, bottom, left, topleft, topright, bottomleft, bottomright) from a width and a height [NOT EFFICIENT, DON'T USE].
 *
 * @param  {type} width  the target width.
 * @param  {type} height the target height.
 */
GUI.prototype.getSprites = function(width, height)
{
    //Background and four angles
    var sprites =
    [
        {
            sx: this.background.x,
            sy: this.background.y,
            sw: 1,
            sh: 1,
            x: this.left.w,
            y: this.top.h,
            width: width - this.left.w - this.right.w,
            height: height - this.top.h - this.bottom.h
        },
        {
            sx: this.topright.x,
            sy: this.topright.y,
            sw: this.topright.w,
            sh: this.topright.h,
            x: width - this.topright.w,
            y: 0,
            width: this.topright.w,
            height: this.topright.h
        },
        {
            sx: this.topleft.x,
            sy: this.topleft.y,
            sw: this.topleft.w,
            sh: this.topleft.h,
            x: 0,
            y: 0,
            width: this.topleft.w,
            height: this.topleft.h
        },
        {
            sx: this.bottomright.x,
            sy: this.bottomright.y,
            sw: this.bottomright.w,
            sh: this.bottomright.h,
            x: width - this.bottomright.w,
            y: height - this.bottomright.h,
            width: this.bottomright.w,
            height: this.bottomright.h
        },
        {
            sx: this.bottomleft.x,
            sy: this.bottomleft.y,
            sw: this.bottomleft.w,
            sh: this.bottomleft.h,
            x: 0,
            y: height - this.bottomleft.h,
            width: this.bottomleft.w,
            height: this.bottomleft.h
        }
    ];

    //Top border
    for(var t = this.topleft.w; t < width - this.topright.w; t++)
    {
        sprites.push
        ({
            sx: this.top.x,
            sy: this.top.y,
            sw: 1,
            sh: this.top.h,
            x: t,
            y: 0,
            width: 1,
            height: this.top.h
        });
    }

    //Right border
    for(var r = this.topright.h; r < height - this.bottomright.h; r++)
    {
        sprites.push
        ({
            sx: this.right.x,
            sy: this.right.y,
            sw: this.right.w,
            sh: 1,
            x: width - this.right.w,
            y: r,
            width: this.right.w,
            height: 1
        });
    }

    //Bottom border
    for(var b = this.bottomleft.w; b < width - this.bottomright.w; b++)
    {
        sprites.push
        ({
            sx: this.bottom.x,
            sy: this.bottom.y,
            sw: 1,
            sh: this.bottom.h,
            x: b,
            y: height - this.bottom.h,
            width: 1,
            height: this.bottom.h
        });
    }


    //Left border
    for(var l = this.topleft.h; l < height - this.bottomleft.h; l++)
    {
        sprites.push
        ({
            sx: this.left.x,
            sy: this.left.y,
            sw: this.left.w,
            sh: 1,
            x: 0,
            y: l,
            width: this.left.w,
            height: 1
        });
    }

    return sprites;
}
