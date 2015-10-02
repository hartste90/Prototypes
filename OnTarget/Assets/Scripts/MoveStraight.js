
/**
Obstacle:
Any item that reacts to a bullet hit

**/

public class MoveStraight extends MonoBehaviour
{

		
	var start_position : Vector2;
	var direction : Vector2;

	function Start () {
		start_position = transform.position;
		transform.position.x = start_position.x;
		transform.position.y = start_position.y;
	}

	function Update () {

		transform.position.x = transform.position.x - direction.x;
		transform.position.y = transform.position.y - direction.y;


	}
	function OnCollisionEnter2D( coll: Collision2D ) 
	{
		if (coll.gameObject.tag == "Screen Edge")
		{
			transform.position.x = start_position.x;
			transform.position.y = start_position.y;
		}
		
			
	}

}