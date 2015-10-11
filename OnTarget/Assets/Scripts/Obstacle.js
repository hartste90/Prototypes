
/**
Obstacle:
Any item that reacts to a bullet hit

**/

public class Obstacle extends MonoBehaviour
{
	
		
	public var health : float = 10;
	public var tint_time : float = 0.1;
	public var lerp_speed : float = 15;
	public var lerp_size : float = 1.5;
	public var sound_hit: AudioClip;
	public var sound_explode: AudioClip; 
	 
	public var recapMenu : GameObject;
	 
	protected var tint_timer : float;
	protected var original_color : Color;
	protected var current_color : Color;
	protected var original_scale : Vector2;




	function Start () {
		tint_timer = Time.time;
		original_color = transform.GetComponent(SpriteRenderer).color;
		original_scale = transform.localScale;
	}

	function Update () {
		//if the item has been tinted long enough, turn it back to normal color
		if (Time.time > tint_timer)
		{
			Untint();

		}
		//if the item has been scaled after hit, lerp it back to normal size
		if (transform.localScale != original_scale)
		{
			transform.localScale = Vector2.Lerp(transform.localScale, original_scale, Time.deltaTime * lerp_speed);
		}
		
	}
	
	function Untint ()
	{
		gameObject.GetComponent(SpriteRenderer).color = original_color; 
	}

	function OnCollisionEnter2D( coll: Collision2D ) 
	{
		var in_trial = 	GameObject.Find("Game Master").GetComponent(GameMaster).in_trial;
		if (in_trial)
		{
			//if hit by a  bullet
			if (coll.gameObject.tag == "Bullet")
			{
				//destroy the bullet
				Destroy(coll.gameObject);
				//visual target feedback
				Lerp();
				//audio feedback - hit
				PlaySound("hit");
				//color feedback
				Tint();
				//apply damage in model
				ApplyDamage(coll.transform.GetComponent(Bullet).getDamage());
			}
		}
			
	}

	function ApplyDamage ( damage: float )
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
			yield WaitForSeconds(2);
			var canvas = Instantiate(recapMenu);
			//canvas.transform.Find("TopMenu").GetComponent(RectTransform).position.y = 800;
		}
	}
	
	function Tint ( )
	{
		gameObject.GetComponent(SpriteRenderer).color = new Color(.9,.9,.9,.85); 
		transform.FindChild("inner_target").GetComponent(SpriteRenderer).color = new Color(.9,.9,.9,.85); 
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
		transform.localScale.x += transform.localScale.x * .5;
		transform.localScale.y += transform.localScale.y * .5;
	}
}