using UnityEngine;
using System.Collections;

public enum MineTypes
{
	None,
	Still,
	Bounce
}

public class Mine : Obstacle 
{
	public bool doesBounce = false;

	public DIRECTIONS direction;
	public float speed = 12f;

	void Start() {
		InvokeRepeating("MoveInCurrentDirection", 0.0f, 1f);
	}

	public void MoveInCurrentDirection ()
	{
		Vector2 pos = transform.position;
		switch(direction)
		{
		case DIRECTIONS.NORTH:
			pos.y += speed;
			break;
		case DIRECTIONS.EAST:
			pos.x += speed;
			break;
		case DIRECTIONS.SOUTH:
			pos.y -= speed;
			break;
		case DIRECTIONS.WEST:
			pos.x -= speed;
			break;
		}
		transform.position = pos;
	}

	//flips direction when it hits an obstacle
	public void OnHitObstacle()
	{
		ReverseDirection ();
	}

	public void ReverseDirection()
	{
		switch(direction)
		{
		case DIRECTIONS.NORTH:
			direction = DIRECTIONS.SOUTH;
			break;
		case DIRECTIONS.EAST:
			direction = DIRECTIONS.WEST;
			break;
		case DIRECTIONS.SOUTH:
			direction = DIRECTIONS.NORTH;
			break;
		case DIRECTIONS.WEST:
			direction = DIRECTIONS.EAST;
			break;
		}
	}

	protected override void OnCollide( Collider2D coll)
	{
		if ( coll.gameObject.tag == "Player")
		{
			OnHitPlayer( coll.gameObject );
		}
		else
		{
			OnHitObstacle ();
		}
	}
	
	protected void OnHitPlayer( GameObject player)
	{
		Debug.Log ("Mine Hit");
	}


}
