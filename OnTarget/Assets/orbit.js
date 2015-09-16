#pragma strict

var xSpeed = 100;
var ySpeed = 100;

function Start () 
{

}

function Update () 
{
	transform.Rotate(xSpeed * Time.deltaTime, ySpeed * Time.deltaTime, 0);

}