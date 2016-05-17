using UnityEngine;
using System.Collections;

public class FallToSide : MonoBehaviour 
{
	protected string direction;
	// Use this for initialization
	void Start ()
	{
		direction = GameManager.instance.direction;
	}

	// Update is called once per frame
	void Update () 
	{
		Vector2 newPos;
		if (direction == "left")
		{
			newPos = new Vector2( transform.position.x - GameMaster.fallSpeed * 2, transform.position.y );
		}
		else
		{
			newPos = new Vector2( transform.position.x + GameMaster.fallSpeed * 2, transform.position.y );
		}
		gameObject.transform.position = newPos;
		CheckStop();
	}

	protected void CheckStop()
	{
		//		Debug.Log(Camera.main.ScreenToWorldPoint(new Vector3(0,0,1)).x);
		//at left
		if (transform.position.x <= Camera.main.ScreenToWorldPoint(new Vector3(0,0,1)).x && direction == "left")
		{
			Debug.Log("STOPPED AT LEFT");
			GetComponent<Rigidbody2D>().velocity = Vector2.zero;
			transform.position = new Vector2( Camera.main.ScreenToWorldPoint(new Vector3(0,0,1)).x, transform.position.y );
		}
		else if (transform.position.x >= Camera.main.ScreenToWorldPoint(new Vector3(Screen.width,0,1)).x && direction == "right")
		{
			GetComponent<Rigidbody2D>().velocity = Vector2.zero;
			transform.position = new Vector2( Camera.main.ScreenToWorldPoint(new Vector3(Screen.width,0,1)).x, transform.position.y );
		}
	}
}
