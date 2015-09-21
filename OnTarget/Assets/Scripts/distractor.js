

public class Distractor extends Obstacle
{

	public var tint_timer : float;
	public var sound_hit: AudioClip;
	public var sound_explode: AudioClip; 
	
	public var health_alert: float = 10;
    
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
	}
	public function Update () 
	{
		if (Time.time > tint_timer)
		{
			gameObject.GetComponent(SpriteRenderer).color = new Color(1,1,1,1); 
		}

	}

	public function OnCollisionEnter2D( coll: Collision2D ) 
	{
		super.OnCollisionEnter2D (coll);
			
	}

	public function ApplyDamage ( damage: float )
	{
		health -= damage;
		if (health <= 0)
		{
			Explode();
		}
		gameObject.GetComponent(SpriteRenderer).color.b -= 10;
		gameObject.GetComponent(SpriteRenderer).color.g -= 10;

		
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

