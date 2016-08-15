//lowHeight, highHeight, lowSlope, highSlope, lowHeightAll, highHeightAll, lowSlopeAll, highSlopeAll

///////////CODE/////////////

print('Script by ctRy');

if (arguments[0] == "")
    throw "Argument 0 = what to find (lowHeight, highHeight, lowSlope, highSlope, lowHeightAll, highHeightAll, lowSlopeAll, highSlopeAll)\n";



var arg = arguments[0].split(" ").join("").toLowerCase();

var isHigh = arg.indexOf("low") == -1;
var isSlope = arg.indexOf("height") == -1;
var findAll = arg.indexOf("all") != -1

print("finding " + (isHigh ? "high" : "low") + "est " + (isSlope ? "slope" : "height"));

var rect = dimension.getExtent();

var ans = (isHigh ? -1 : 257);
var ansX = 0;
var ansY = 0;
var temp;

for (var x = rect.getX() * 128; x < rect.getWidth() * 128; x++)
{
    for (var y = rect.getY() * 128; y < rect.getHeight() * 128; y++)
    {
    	if (isSlope)
    		temp = dimension.getSlope(x, y);
    	else
    		temp = dimension.getIntHeightAt(x, y);

    	if ((isHigh && temp > ans) || (!isHigh && temp < ans))
		{
			ans = temp;
			ansX = x;
			ansY = y;
		}

    }
}


if (findAll)
{
	print("\n" + (isHigh ? "high" : "low") + "est " + (isSlope ? "slope" : "height") + " was " + ans + "\n");
	print("Now finding all coords");
	for (var x = rect.getX() * 128; x < rect.getWidth() * 128; x++)
	{
	    for (var y = rect.getY() * 128; y < rect.getHeight() * 128; y++)
	    {
	    	if (isSlope)
	    		temp = dimension.getSlope(x, y);
	    	else
	    		temp = dimension.getIntHeightAt(x, y);

	    	if (temp == ans)
			{
				print("(" + x + ", " + y + ")");
			}

	    }
	}
}
else
{
	print("\n" + (isHigh ? "high" : "low") + "est " + (isSlope ? "slope" : "height") + " was " + ans + ", which was located in coord (" + ansX + ", " + ansY + ")\n");
}

print('Done! :D');