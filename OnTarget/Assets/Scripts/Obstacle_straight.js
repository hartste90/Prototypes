
/**
Obstacle:
Any item that reacts to a bullet hit

**/

public class Obstacle_straight extends Obstacle
{

		
	var start_position : Vector2;
	var direction : Vector2;

	function Start () {
		super.Start();
		transform.position.x = start_position.x;
		transform.position.y = start_position.y;
	}

	function Update () {

		super.Update();
		transform.position.x = transform.position.x - direction.x;
		transform.position.y = transform.position.y - direction.y;


	}
	function OnCollisionEnter2D( coll: Collision2D ) 
	{
		super.OnCollisionEnter2D(coll);
		if (coll.gameObject.tag == "Screen Edge")
		{
			transform.position.x = start_position.x;
			transform.position.y = start_position.y;
		}
			
	}

}