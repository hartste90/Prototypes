#pragma strict

public class Distractor extends MonoBehaviour
{

    public var health : float;
	public var tint_timer : float;
	public var lerp_speed : float = 2;
	public var sound_hit: AudioClip;
	public var sound_explode: AudioClip; 
	public var original_position: Vector3;
    
    public function Distractor()
    {
        health = 100;
    }
    public function Distractor(hp : int)
    {
        health = hp;
    }
   
	public function Start () 
	{
		tint_timer = Time.time;
		original_position = transform.position;
	}
	public function Update () 
	{
		if (Time.time > tint_timer)
		{
			gameObject.GetComponent(SpriteRenderer).color = new Color(1,1,1,1); 
		}
		if (transform.position != original_position)
		{
			transform.position = Vector2.Lerp(transform.position, original_position, Time.deltaTime * lerp_speed);
		}
	}

	public function OnCollisionEnter2D( coll: Collision2D ) 
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

	public function ApplyDamage ( damage: float )
	{
		health -= damage;
		if (health <= 0)
		{
			Explode();
		}
		gameObject.GetComponent(SpriteRenderer).color.b -= .1;
		gameObject.GetComponent(SpriteRenderer).color.g -= .1;

		
	}
	
	public function Explode ()
	{
		Destroy(gameObject);
		var recap = GameObject.Find("Recap Menu");
		var canvas = recap.GetComponent(Canvas);
		canvas.enabled = true;
		//disable the Next button since they failed the level
		GameObject.Find("Next Level Button").GetComponent(UI.Button).interactable = false;

	}
    
}

