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
	GameObject.Find("Game Master").GetComponent(GameMaster).in_trial = true;
	Application.LoadLevel(Application.loadedLevel);
}


function onLevels ()
{
	Debug.Log("GOING TO LEVEL SCREEN");
	GameObject.Find("Game Master").GetComponent(GameMaster).in_trial = true;
	Application.LoadLevel("LevelSelect");


}

function onNewGame ()
{
	Debug.Log("GOING TO NEW GAME");
	GameObject.Find("Game Master").GetComponent(GameMaster).level = 1;
	GameObject.Find("Game Master").GetComponent(GameMaster).in_trial = true;
	Application.LoadLevel("1");


}


function onNext ()
{
	Debug.Log("GOING TO NEXT LEVEL");
	GameObject.Find("Game Master").GetComponent(GameMaster).level = GameObject.Find("Game Master").GetComponent(GameMaster).level + 1;
	GameObject.Find("Game Master").GetComponent(GameMaster).in_trial = true;
	Application.LoadLevel(GameObject.Find("Game Master").GetComponent(GameMaster).level.ToString());

}