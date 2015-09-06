

var health : float;
var tint_time : float;



function Start () {
}

function Update () {


}

function OnCollisionEnter2D( coll: Collision2D ) 
{
	if (coll.gameObject.tag == "Bullet")
	{
		ApplyDamage(10.0f);
		Destroy(coll.gameObject); 
	}
		
}

function ApplyDamage ( damage: float )
{
	health -= damage;
	if (health <= 0)
	{
		Destroy(gameObject);
		var recap = GameObject.Find("Recap Menu");
		var canvas = recap.GetComponent(Canvas);
		canvas.enabled = true;
		//disable the Next button since they failed the level
		GameObject.Find("Next Level Button").GetComponent(UI.Button).interactable = false;
	}
	gameObject.GetComponent(SpriteRenderer).color.b -= .1;
	gameObject.GetComponent(SpriteRenderer).color.g -= .1;

	
}