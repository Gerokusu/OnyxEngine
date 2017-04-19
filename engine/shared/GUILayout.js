/**
 * GUILayout - Represents a GUI layer to draw.
 *
 * @param  {type} guiElements the list of possible elements to display.
 */
function GUILayout(guiElements)
{
    this.guiElements = [];

    for(var guiElement of guiElements)
    {
        this.guiElements[guiElement.id] = new GUIElement(guiElement.texture, guiElement.textarea);
    }

    this.heights = [];
}

/**
 * GUILayout.prototype.clearAll - Clears all layout heights.
 */
GUILayout.prototype.clearAll = function()
{
    this.heights = [];
}

/**
 * GUILayout.prototype.clearHeight - Clears the specified layout height.
 *
 * @param  {type} height the layout height to clear.
 */
GUILayout.prototype.clearHeight = function(height)
{
    this.heights[height] = [];
}

/**
 * GUILayout.prototype.add - Add a GUI element to the specified layout height.
 *
 * @param  {type} height  the height in which to add the GUI Element.
 * @param  {type} index the GUI element index to add.
 * @param  {type} position the GUI element position.
 * @param  {type} text the text written on the GUI element.
 */
GUILayout.prototype.add = function(height, index, position, text)
{
    var guiElement = this.guiElements[index];
    if(guiElement)
    {
        var onScreen =
        {
            element: guiElement,
            x: position.x,
            y: position.y,
            align: position.align ? position.align : "default",
            fixed: position.fixed ? position.fixed : false,
            text: text
        };

        for(var i = 0; i <= height; i++)
        {
            if(!this.heights[i])
            {
                this.heights[i] = [];
            }
        }

        this.heights[height].push(onScreen);
    }
}
