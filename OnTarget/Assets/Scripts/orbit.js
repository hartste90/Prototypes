#pragma strict

var xSpeed = 100;
var ySpeed = 100;
var zSpeed = 100;

function Start () 
{

}

function Update () 
{
	transform.Rotate(xSpeed * Time.deltaTime, ySpeed * Time.deltaTime, zSpeed * Time.deltaTime);

}