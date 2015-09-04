
function Start () {

}

function Update () {

}

function onSelectLevel ( val:int  )
{
	GameObject.Find("Game Master").GetComponent(GameMaster).level = val;
	Application.LoadLevel(val.ToString());
}