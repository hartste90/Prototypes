using UnityEngine;
using System.Collections;

public class BounceMine : Mine 
{
	public DIRECTIONS direction;
	public float speed = 12f;



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

	//flips direction when it hits an obstacle
	public void OnHitObstacle()
	{
		ReverseDirection ();
	}

}
