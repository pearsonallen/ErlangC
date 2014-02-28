CallDuration = 4;
IntervalLength = 60;
Agents = 0;
Calls = 0;

function OptimalStaff(daCalls, idealImmediateAnswer)
{
	i = 0;
	Calls=daCalls;
	for (i=0;i<=500;i++)
	{
		Agents = i;
		if (ImmediateAnswer() > idealImmediateAnswer)
		{			
			return i - 1;
		}
	}	
}
function AverageSpeedOfAnswer()
{
	return Math.round((ErlangC() * (CallDuration * 60) / (Agents * (1 - AgentOccupancy())))*100)/100;
}
function ImmediateAnswer()
{
	return Math.round(( 1 - ErlangC() * 100 )*100)/100;
}
function ErlangC()
{
	return Poisson(Agents, TrafficIntensity()) / (Poisson(Agents, TrafficIntensity()) + (1 - AgentOccupancy()) * PoissonCumul(Agents - 1, TrafficIntensity()));
}
function TrafficIntensity()
{
	return (Calls / (IntervalLength * 60)) * (CallDuration * 60);
}
function AgentOccupancy()
{
	return TrafficIntensity() / Agents;
}
function Poisson(IdealSuccesses, TheMean)
{
	Numerator = 0;
	Denominator = 0;
	if (IdealSuccesses <= 0)
	{ 
		return 0 
	} else {
		Numerator = Math.pow(TheMean, IdealSuccesses) * (Math.pow(Math.E, (TheMean * -1)));
		Denominator = Factorial(IdealSuccesses);
		return Numerator / Denominator;
	}
}
function PoissonCumul(IdealSuccesses, TheMean)
{
	daReturn = 0;
	i = 0;
	for (i=0;i<=IdealSuccesses;i++)
	{
		daReturn = daReturn + Poisson(i, TheMean);
	}
	return daReturn;
}
function Factorial(Input)
{
	if (Input == 0)
	{
		return 1
	} else {
		return Input * Factorial(Input - 1);
	}
}