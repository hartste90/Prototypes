
/**
Obstacle:
Any item that reacts to a bullet hit

**/

public class Obstacle extends MonoBehaviour
{

		
	public var health : float = 10;
	public var tint_time : float = 0.1;
	public var lerp_scale : boolean = true;
	public var lerp_speed : float = 15;
	public var lerp_size : float = 1.5;
	public var sound_hit: AudioClip;
	public var sound_explode: AudioClip; 
	 


	private var tint_timer : float;
	private var current_color : Color;
	private var original_scale : Vector2;



	function Start () {
		tint_timer = Time.time;
		original_scale = transform.localScale;
	}

	function Update () {

		if (Time.time > tint_timer)
		{
			gameObject.GetComponent(SpriteRenderer).color = new Color(1,1,1,1); 
		}

		if (lerp_scale && transform.localScale != original_scale)
		{
			transform.localScale = Vector2.Lerp(transform.localScale, original_scale, Time.deltaTime * lerp_speed);
		}


	}

	function OnCollisionEnter2D( coll: Collision2D ) 
	{
		if (coll.gameObject.tag == "Bullet")
		{
			Destroy(coll.gameObject);
			//visual target feedback
			Lerp();
			//audio feedback - hit
			PlaySound("hit");
			//color feedback
			Tint();
			//apply damage in model
			ApplyDamage(1.0f);
			
			 
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
				//audio feedback - explode
				PlaySound("explode");
				transform.GetComponent(SpriteRenderer).enabled = false;
				transform.GetComponent(Collider2D).enabled = false;

				//Destroy(gameObject);
				GameObject.Find("Game Master").GetComponent(GameMaster).in_trial = false;
				yield WaitForSeconds(1);
				var canvas = GameObject.Find("Recap Menu").GetComponent(Canvas);
				canvas.enabled = true;
			}
		}
	}
	
	function Tint ( )
	{
		gameObject.GetComponent(SpriteRenderer).color = new Color(.9,.9,.9,.85); 
		tint_timer = Time.time + tint_time;
	}
	
	function PlaySound (sound : String)
	{
		if ( sound == "hit" )
		{
			transform.GetComponent(AudioSource).clip = sound_hit;
		}
		else if ( sound == "explode" )
		{
			transform.GetComponent(AudioSource).clip = sound_explode;
		}
		transform.GetComponent(AudioSource).Play();
	}
	
	function Lerp ()
	{
		if (lerp_scale)
		{
			transform.localScale.x += transform.localScale.x * .5;
			transform.localScale.y += transform.localScale.y * .5;
		}
	}
}