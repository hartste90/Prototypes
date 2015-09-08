

var health : float;
var tint_time : float;

private var tint_timer : float;

private var current_color : Color;


function Start () {
	tint_timer = Time.time;
}

function Update () {

	if (Time.time > tint_timer)
	{
		gameObject.GetComponent(SpriteRenderer).color = new Color(1,1,1,1); 
	}


}

function OnCollisionEnter2D( coll: Collision2D ) 
{
	if (coll.gameObject.tag == "Bullet")
	{
		Destroy(coll.gameObject);
		ApplyDamage(10.0f);
		 
	}
		
}

function ApplyDamage ( damage: float )
{
	var in_trial = 	GameObject.Find("Game Master").GetComponent(GameMaster).in_trial;
	Debug.Log(in_trial);
	if (in_trial)
	{
		health -= damage;
		if (health <= 0)
		{
			Destroy(gameObject);
			GameObject.Find("Game Master").GetComponent(GameMaster).in_trial = false;
			var canvas = GameObject.Find("Recap Menu").GetComponent(Canvas);
			canvas.enabled = true;
		}
		gameObject.GetComponent(SpriteRenderer).color = new Color(.25,.25,.25,.85); 
		tint_timer = Time.time + tint_time;
	}
}