
var health : float;
var tint_time : float;
var lerp_speed : float = 2;
var sound_hit: AudioClip;
var sound_explode: AudioClip; 
 


private var tint_timer : float;
private var current_color : Color;
private var original_position : Vector2;



function Start () {
	tint_timer = Time.time;
	original_position = transform.position;
}

function Update () {

	if (Time.time > tint_timer)
	{
		gameObject.GetComponent(SpriteRenderer).color = new Color(1,1,1,1); 
	}
	if (transform.position != original_position)
	{
		Debug.Log("Lerping");
		transform.position = Vector2.Lerp(transform.position, original_position, Time.deltaTime * lerp_speed);
	}


}

function OnCollisionEnter2D( coll: Collision2D ) 
{
	if (coll.gameObject.tag == "Bullet")
	{
		Destroy(coll.gameObject);
		//visual target feedback
		transform.position.y = transform.position.y + Random.Range(.05, .15);
		//audio feedback
		transform.GetComponent(AudioSource).clip = sound_hit;
		transform.GetComponent(AudioSource).Play();
		//apply damage in model
		ApplyDamage(10.0f);
		
		 
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
			transform.GetComponent(AudioSource).clip = sound_explode;
			transform.GetComponent(AudioSource).Play();
			transform.GetComponent(SpriteRenderer).enabled = false;
			transform.GetComponent(Collider2D).enabled = false;

			//Destroy(gameObject);
			GameObject.Find("Game Master").GetComponent(GameMaster).in_trial = false;
			yield WaitForSeconds(1);
			var canvas = GameObject.Find("Recap Menu").GetComponent(Canvas);
			canvas.enabled = true;
		}
		gameObject.GetComponent(SpriteRenderer).color = new Color(.25,.25,.25,.85); 
		tint_timer = Time.time + tint_time;
	}
}