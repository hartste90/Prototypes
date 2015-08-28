#pragma strict

var projectile : GameObject;
var min_fire_rate : float;
var current_fire_rate : float;
var delta_fire_rate : float;
var max_fire_rate : float;

private var nextFire : float = 0.0;

function Start ()
{
	current_fire_rate = min_fire_rate;
}	
function Update () 
{
	//move the gunship to the touch location
	var pos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
	transform.position = new Vector3 ( pos.x, transform.position.y, 0);
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
	}
	if (Input.GetButtonUp("Fire1"))
	{
		current_fire_rate = min_fire_rate;
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