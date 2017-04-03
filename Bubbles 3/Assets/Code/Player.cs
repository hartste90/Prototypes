using UnityEngine;
using System.Collections;

public enum DIRECTIONS
{
	NORTH, EAST, SOUTH, WEST
}

/// <summary>
/// Every X seconds the Player moves Y distance in the direction it is facing
/// When the user taps left or right side of the screen, the player should drop an obstalce in it's current box, and update its direction
/// When the player hits a wall, the player is moved back one space and that wall should move 1 step towards the center of the map
/// When the player hits an obstacle, it ends the game
/// </summary>

public class Player : MonoBehaviour 
{

	public GameManager gameManager;
	public GameObject mine;

	public DIRECTIONS direction;

	public float speed;

	protected bool shouldDrop;

	void Start() {
		
		shouldDrop = false;
		speed = 12f;
		InvokeRepeating("MoveInCurrentDirection", 0.0f, 1f);
	}


	public void MoveInCurrentDirection ()
	{
		//check if needs to drop mine
		if (shouldDrop) 
		{
			shouldDrop = false;
			Instantiate (mine, transform.position, Quaternion.identity);
		}

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


	public void UpdateDirection(int turnDirection)
	{
		direction = (DIRECTIONS) turnDirection;
		shouldDrop = true;
	}

	public void Turn (int turnDirection)
	{
		if (turnDirection < 0) 
		{

			switch (direction) 
			{
			case DIRECTIONS.NORTH:
				direction = DIRECTIONS.WEST;  
				break;
			case DIRECTIONS.EAST:
				direction = DIRECTIONS.NORTH;  
				break;
			case DIRECTIONS.SOUTH:
				direction = DIRECTIONS.EAST;  
				break;
			case DIRECTIONS.WEST:
				direction = DIRECTIONS.SOUTH; 
				break;
			default:
				Debug.Log ("DIRECTION NOT SET ON PLAYER");
				break;
			}
		}
		else if (turnDirection > 0) 
		{
			switch (direction) 
			{
			case DIRECTIONS.NORTH:
				direction = DIRECTIONS.EAST;  
				break;
			case DIRECTIONS.EAST:
				direction = DIRECTIONS.SOUTH;  
				break;
			case DIRECTIONS.SOUTH:
				direction = DIRECTIONS.WEST;  
				break;
			case DIRECTIONS.WEST:
				direction = DIRECTIONS.NORTH;  
				break;
			default:
				Debug.Log ("DIRECTION NOT SET ON PLAYER");
				break;
			}
		}
	}








}
