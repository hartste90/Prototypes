

var health : float;
var tint_time : float;

var start_position : Vector2;
var direction : Vector2;

function Start () {
	transform.position.x = start_position.x;
	transform.position.y = start_position.y;
}

function Update () {

	transform.position.x = transform.position.x - direction.x;
	transform.position.y = transform.position.y - direction.y;
}

function OnCollisionEnter2D( coll: Collision2D ) 
{
	Debug.Log(coll.gameObject.tag);
	if (coll.gameObject.tag == "Bullet")
	{
		ApplyDamage(10.0f);
		Destroy(coll.gameObject); 
	}
	if (coll.gameObject.tag == "Screen Edge")
	{
		transform.position.x = start_position.x;
		transform.position.y = start_position.y;
	}
		
}

function ApplyDamage ( damage: float )
{
	var in_trial = 	GameObject.Find("Game Master").GetComponent(GameMaster).in_trial;
	if (in_trial)
	{
		health -= damage;
		if (health <= 0)
		{
			Destroy(gameObject);
			GameObject.Find("Game Master").GetComponent(GameMaster).in_trial = false;

			var recap = GameObject.Find("Recap Menu");
			var canvas = recap.GetComponent(Canvas);
			canvas.enabled = true;
			//disable the Next button since they failed the level
			GameObject.Find("Next Level Button").GetComponent(UI.Button).interactable = false;
		}
		gameObject.GetComponent(SpriteRenderer).color.b = health / 10 * .1;
		gameObject.GetComponent(SpriteRenderer).color.g = health / 10 * .1;
	}
	
}