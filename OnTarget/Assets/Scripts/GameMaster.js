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

function onNext ()
{
	Debug.Log("GOING TO NEXT LEVEL");

}