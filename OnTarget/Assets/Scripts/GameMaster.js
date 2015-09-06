#pragma strict

var level:int;

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
	Application.LoadLevel(Application.loadedLevel);
}


function onLevels ()
{
	Debug.Log("GOING TO LEVEL SCREEN");
	Application.LoadLevel("LevelSelect");


}

function onNewGame ()
{
	Debug.Log("GOING TO NEW Game");
	level = 1;
	Application.LoadLevel("1");


}


function onNext ()
{
	Debug.Log("GOING TO NEXT LEVEL");
	level = level + 1;
	Application.LoadLevel(level.ToString());

}