#pragma strict

var XrotationSpeed = 100;
var YrotationSpeed = 50;

private var delta = 0;
function Update() 
{
    transform.Rotate(XrotationSpeed * Time.deltaTime * delta, YrotationSpeed * Time.deltaTime, 0);
//    delta = delta + 1;
//    if (delta > 100)
//    {
//    	delta = 0;
//    }
}