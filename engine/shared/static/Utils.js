/**
 * Utils - Represents utility functions.
 */
function Utils()
{

}

Utils.pad = function(number, n)
{
    var string = "0".repeat(n) + number;
    return string.substr(string.length - n)
}
