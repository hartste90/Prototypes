#pragma strict

public var explosion : GameObject;

var speed : float = 10f;
var damage : float = 1f;
var fired : boolean = false;


function Start () 
{
	fired = false;
	speed = 0;
}

function Update () 
{
	if (fired)
	{
		transform.position = new Vector3( transform.position.x, transform.position.y + speed, 0);
	}
	
}

public function fire( speed, damage )
{
	fired = true;
	this.speed = speed;
	this.damage = damage;
}

public function getDamage()
{
	Instantiate(explosion, transform.position, transform.rotation);
	return damage;
	
}