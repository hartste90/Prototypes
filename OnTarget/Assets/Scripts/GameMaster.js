#pragma strict

var level:int;
var in_trial: boolean = false;

function Awake() 
{
	DontDestroyOnLoad (this);
}

function Start () {

}

function Update () {

}

function onReplay ()
{
	Debug.Log("REPLAYING THIS LEVEL");
	in_trial = true;
	Application.LoadLevel(Application.loadedLevel);
}


function onLevels ()
{
	Debug.Log("GOING TO LEVEL SCREEN");
	in_trial = true;
	Application.LoadLevel("LevelSelect");


}

function onNewGame ()
{
	Debug.Log("GOING TO NEW Game");
	level = 1;
	in_trial = true;
	//Application.LoadLevel("1");


}


function onNext ()
{
	Debug.Log("GOING TO NEXT LEVEL");
	level = level + 1;
	in_trial = true;
	Application.LoadLevel(level.ToString());

}