// script.name=FindCoord - ctRy
// script.description=Places the given layer on the same positions as another layer (with the same intensity).\nParameter below can be lowHeight, highHeight, lowSlope, or highSlope
// script.param.find.type=string
// script.param.find.description=can be lowHeight, highHeight, lowSlope, or highSlope
// script.param.find.displayName=What To Find
// script.param.find.default=highHeight
// script.param.all.type=boolean
// script.param.all.description=Checking true will print out all points
// script.param.all.displayName=Find All Points
// script.param.all.default=false
// script.hideCmdLineParams=true

//lowHeight, highHeight, lowSlope, highSlope, lowHeightAll, highHeightAll, lowSlopeAll, highSlopeAll

///////////CODE/////////////

if (parseInt(org.pepsoft.worldpainter.Version.BUILD) <= 20160820173357)
	throw "Update WorldPainter!";

print('Script by ctRy');

var arg = params['find'].toLowerCase();

var isHigh = arg.indexOf("low") == -1;
var isSlope = arg.indexOf("height") == -1;
var findAll = params['all'];

print("finding " + (isHigh ? "high" : "low") + "est " + (isSlope ? "slope" : "height"));

var ans = (isHigh ? -1 : 257);
var ansX = 0;
var ansY = 0;
var temp;

var rect = dimension.getExtent();
var xMin = rect.getX() * 128;
var yMin = rect.getY() * 128;

for (var x = xMin; x < rect.getWidth() * 128 + xMin; x++)
{
    for (var y = yMin; y < rect.getHeight() * 128 + yMin; y++)
    {
    	if (!dimension.isTilePresent(truncate((x + xMin) / 128.0), truncate((y + yMin) / 128.0) ))
				continue;

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
	for (var x = xMin; x < rect.getWidth() * 128 + xMin; x++)
	{
	    for (var y = yMin; y < rect.getHeight() * 128 + yMin; y++)
	    {
	    	if (!dimension.isTilePresent(truncate((x + xMin) / 128.0), truncate((y + yMin) / 128.0) ))
				continue;

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

function truncate(number)
{
    return number > 0
         ? Math.floor(number)
         : Math.ceil(number);
}