
var projectile : GameObject;
var min_fire_rate : float;
var current_fire_rate : float;
var delta_fire_rate : float;
var max_fire_rate : float;


public var gameMaster : GameMaster;
public var ship_speed : float = 20;

private var nextFire : float = 0.0f;
private var lastFire : float = 0.0f;
public var timeBetweenBullets : float = .2f;
public var sound_bullet: AudioClip;


private var original_y : float;
private var max_kickback : float = 0.3f;
private var kickback_speed : float;
private var sprite : GameObject;
private var pos : Vector2;

private var charging : boolean = false;
private var max_bullet_size : float = 0.08f;
private var max_bullet_speed : float = 0.08f;

private var bullet : GameObject;
function Start ()
{
	gameMaster = GameObject.Find("Game Master").GetComponent(GameMaster);
	sprite = transform.FindChild("Sprite").gameObject;
	current_fire_rate = min_fire_rate;
	pos = transform.position;
	original_y = sprite.transform.position.y;
	charging = false;
}	

function Update () 
{
	if (gameMaster.in_trial)
	{
		ChargeBullet();	
		LerpMovement();
		ReleaseBullet();
		LerpKickback();
	}
	
}

function ChargeBullet()
{
	//move the gunship to the touch location
	if (Input.GetButton("Fire1"))
	{
		pos.x = Camera.main.ScreenToWorldPoint(Input.mousePosition).x;
		//if theres no bullet, create one
		if (!charging && (Time.time - lastFire > timeBetweenBullets))
		{
			charging = true;
			var bullet_position = transform.FindChild("bullet_zone").transform.position;
			bullet = Instantiate(projectile, bullet_position, transform.rotation);
		}
	}
}

function LerpMovement ()
{
	if (transform.position != pos && bullet != null)
	{
		transform.position = Vector2.Lerp(transform.position, pos, Time.deltaTime * ship_speed);
		bullet.transform.position = transform.FindChild("bullet_zone").transform.position;
	}
}

function ReleaseBullet()
{
	if (Input.GetButtonUp("Fire1"))
	{
		//current_fire_rate = min_fire_rate;
		Kickback( 100.0 );
		var bullet_speed =  .1; //( max_bullet_speed * max_bullet_size ) / bullet.transform.localScale.x;
		var bullet_damage = (bullet.transform.localScale.x >= .3) ? 3 : 1;
		bullet.transform.GetComponent(Bullet).fire( bullet_speed, bullet_damage );
		bullet = null;
		charging = false;
		transform.GetComponent(AudioSource).clip = sound_bullet;
		transform.GetComponent(AudioSource).Play();
		lastFire = Time.time;
	}
}

//shows gun kickback for the gunship when bullet fired
function Kickback ( percent : float )
{	
	sprite.transform.position.y -= (percent/100) * max_kickback;
	//cap kickback to reasonable amount
	if ( sprite.transform.position.y < (original_y - max_kickback ))
	{
		sprite.transform.position.y = original_y - max_kickback;
	}
}

function LerpKickback ()
{
	//lerp gun back to original y position
	if (sprite.transform.position.y != original_y)
	{	
		var original_position = new Vector2 (sprite.transform.position.x, original_y);
		sprite.transform.position = Vector2.Lerp(sprite.transform.position, original_position, Time.deltaTime * 15);
	}

}