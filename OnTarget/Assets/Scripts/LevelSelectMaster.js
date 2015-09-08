
function Start () {

}

function Update () {

}

function onSelectLevel ( val:int  )
{
	GameObject.Find("Game Master").GetComponent(GameMaster).level = val;
	GameObject.Find("Game Master").GetComponent(GameMaster).in_trial = true;

	Application.LoadLevel(val.ToString());
}