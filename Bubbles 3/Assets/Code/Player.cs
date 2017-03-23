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

	public DIRECTIONS direction;

	void Start() {
		InvokeRepeating("MoveInCurrentDirection", 1.0f, 0.3f);
	}


	public void MoveInCurrentDirection ()
	{

	}


	public void UpdateDirection (int turnDirection)
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
