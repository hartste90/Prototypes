#pragma strict

var projectile : GameObject;
var min_fire_rate : float;
var current_fire_rate : float;
var delta_fire_rate : float;
var max_fire_rate : float;

private var nextFire : float = 0.0;

private var original_y : float;
private var max_kickback : float = 2;
private var kickback_speed : float;
private var sprite : GameObject;

function Start ()
{
	sprite = transform.FindChild("Sprite").gameObject;
	current_fire_rate = min_fire_rate;
	original_y = sprite.transform.position.y;
}	
function Update () 
{
	//move the gunship to the touch location
	var pos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
	transform.position.x = pos.x;
	//fire bullet
	if (Input.GetButton("Fire1") && Time.time > nextFire) 
	{
		nextFire = Time.time + current_fire_rate;
		if (current_fire_rate > max_fire_rate)
		{
			current_fire_rate -= delta_fire_rate;
		}
		else if (current_fire_rate < max_fire_rate)
		{
			current_fire_rate = max_fire_rate;
		}
		var bullet = Instantiate(projectile, transform.position, transform.rotation);
		Kickback( 10.0 );
	}
	if (Input.GetButtonUp("Fire1"))
	{
		current_fire_rate = min_fire_rate;
	}
	//lerp back to original y position
	if (sprite.transform.position.y != original_y)
	{	
		var original_position = new Vector2 (sprite.transform.position.x, original_y);
		sprite.transform.position = Vector2.Lerp(sprite.transform.position, original_position, Time.deltaTime * 15);
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
//
//function Update () {
//     //Touch Screen***
//     Debug.Log ("Updating");
//     if(Input.touchCount > 0) 
//     {
//     	 Debug.Log ("Detecting touch");
//	     var tapCount = Input.touchCount;
//	     for(var i = 0; tapCount > i; i++) 
//	     {            
//	         if(i < 1) 
//	         {
//	             var touch = Input.GetTouch(i);
//	         }
//	         if(GetComponent(GUITexture)) 
//	         {
//	             if(touch.phase == TouchPhase.Ended && GetComponent.<GUITexture>().HitTest(touch.position)) 
//	             {
//	                 //Call Up Function
//	                 //Up();
//	             }
//	             else 
//	             {
//	                 if(touch.phase == TouchPhase.Stationary && GetComponent.<GUITexture>().HitTest(touch.position)) 
//	                 {
//	                     //Call Hold Function
//	                     //Hold();
//	                 }
//	                 else 
//	                 {
//	                     if(touch.phase == TouchPhase.Began && GetComponent.<GUITexture>().HitTest(touch.position)) 
//	                     {
//	                         //Call Down Function
//	                         //Down();
//	                     }
//	                 }
//	             }
//	         }
//	     }
//     }
// }
// function Hold() {
//     //Increase your Power
// }