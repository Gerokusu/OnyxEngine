function Texture(src, width, height)
{
    this.image = document.createElement("img");
    this.image.src = src;
    this.image.width = width;
    this.image.height = height;
}
