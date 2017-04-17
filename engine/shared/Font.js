/**
 * Font - Represents a loaded font ready to be displayed.
 *
 * @param {String} name the font family name.
 * @param {String} src the source file.
 * @param {Integer} height the height.
 */
function Font(name, src)
{
    this.style = document.createElement("style");
    this.style.textContent = " @font-face { font-family: '" + name + "'; src: url('" + src + "'); }";

    document.body.appendChild(this.style);
}
