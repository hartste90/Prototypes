#pragma strict


var speed : float = 0.5;



function Start () {

}

function Update () {
	transform.position = new Vector3( transform.position.x, transform.position.y + (speed), 0);


}