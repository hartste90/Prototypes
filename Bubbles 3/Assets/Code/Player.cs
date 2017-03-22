using UnityEngine;
using System.Collections;

public class Player : MonoBehaviour {

	[SerializeField]
	protected GameManager gameManager;

	public float horizSpeed;
	public string direction = "left";
	public float dampen = 10.0f;
	protected float timeSinceLastDropped;

	protected float currentVelocity = 0f;
	// Use this for initialization
	void Start () {
		Vector3 screenPos = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width/2,Screen.height/4,1));
		transform.position = screenPos;
		timeSinceLastDropped = 0f;
		gameManager = GameObject.FindGameObjectWithTag("GameController").GetComponent<GameManager>();
		horizSpeed = GameMaster.fallSpeed * 1.5f;
	
	}
	
	// Update is called once per frame
	void Update () 
	{
		// Move();
	}

	// protected void CheckDropSpike()
	// {
	// 	if (Time.time - timeSinceLastDropped > dropSpeed)
	// 	{
	// 		DropStillMine();
	// 		timeSinceLastDropped = Time.time;
	// 	}
	// }

	protected void CheckBounce()
	{
//		Debug.Log(Camera.main.ScreenToWorldPoint(new Vector3(0,0,1)).x);
		//at left
		if (transform.position.x <= Camera.main.ScreenToWorldPoint(new Vector3(0,0,1)).x && direction == "left")
		{

			GetComponent<Rigidbody2D>().velocity = new Vector2 ( GetComponent<Rigidbody2D>().velocity.x * -1, 0f);
			transform.position = new Vector2( Camera.main.ScreenToWorldPoint(new Vector3(0,0,1)).x, transform.position.y );
			direction = "right";
			DropStillMine();

		}
		else if (transform.position.x >= Camera.main.ScreenToWorldPoint(new Vector3(Screen.width,0,1)).x && direction == "right")
		{
			GetComponent<Rigidbody2D>().velocity = new Vector2 ( GetComponent<Rigidbody2D>().velocity.x * -1, 0f);
			transform.position = new Vector2( Camera.main.ScreenToWorldPoint(new Vector3(Screen.width,0,1)).x, transform.position.y );
			direction = "left";
			DropStillMine();

		}
	}

	protected void CheckStop()
	{
		//		Debug.Log(Camera.main.ScreenToWorldPoint(new Vector3(0,0,1)).x);
		//at left
		if (transform.position.x <= Camera.main.ScreenToWorldPoint(new Vector3(0,0,1)).x && direction == "left")
		{
			ChangeDirection();
//			//			Debug.Log("STOPPED AT LEFT");
//			//			currentVelocity = 0f;
//			GetComponent<Rigidbody2D>().velocity = Vector2.zero;
//			transform.position = new Vector2( Camera.main.ScreenToWorldPoint(new Vector3(0,0,1)).x, transform.position.y );
		}
		else if (transform.position.x >= Camera.main.ScreenToWorldPoint(new Vector3(Screen.width,0,1)).x && direction == "right")
		{
			ChangeDirection();
//			//			currentVelocity = 0f;
//			GetComponent<Rigidbody2D>().velocity = Vector2.zero;
//			transform.position = new Vector2( Camera.main.ScreenToWorldPoint(new Vector3(Screen.width,0,1)).x, transform.position.y );
		}
	}

	protected void CheckJump()
	{
		if (Input.GetKeyDown("space") || (Input.GetMouseButtonDown(0)))
		{
			Jump();
		}
	}

	protected void Jump()
	{
		ChangeDirection();
		DropMine();

	}

	public void ChangeDirection()
	{
		GetComponent<Rigidbody2D>().velocity = new Vector3 (0,0,0);

		if (direction == "left")
		{
			direction = "right";
			GetComponent<Rigidbody2D>().AddForce (new Vector3 (1000, 0, 0));
			currentVelocity = horizSpeed;
		}
		else if (direction == "right")
		{
			direction = "left";
			GetComponent<Rigidbody2D>().AddForce (new Vector3 (-1000, 0, 0));
			currentVelocity = -horizSpeed;
		}
		gameManager.direction = direction;
		Debug.Log("New direction: " + direction);
	}

	protected GameObject DropMine()
	{
		GameObject bubble = Instantiate (gameManager.obstaclePrefab);
		bubble.transform.position = transform.position;
		bubble.GetComponent<Obstacle>().upperBoundary = gameManager.upperBoundary;
		return bubble;
	}

	protected void DropStillMine()
	{
		GameObject bubble = Instantiate (gameManager.stillObstaclePrefab);
		bubble.transform.position = transform.position;
		bubble.GetComponent<Obstacle>().upperBoundary = gameManager.upperBoundary;
	}

	protected void ReduceVelocity ()
	{
//		GetComponent<Rigidbody2D>().velocity = new Vector3 (0,0,0);
		if (direction == "left")
		{
			GetComponent<Rigidbody2D>().AddForce (new Vector3 (dampen, 0, 0));
		}
		else
		{
			GetComponent<Rigidbody2D>().AddForce (new Vector3 (-dampen, 0, 0));

		}
	}

	protected void IncreaseVelocity ()
	{
		//		GetComponent<Rigidbody2D>().velocity = new Vector3 (0,0,0);
		if (direction == "left")
		{
			GetComponent<Rigidbody2D>().AddForce (new Vector3 (-dampen, 0, 0));
		}
		else
		{
			GetComponent<Rigidbody2D>().AddForce (new Vector3 (dampen, 0, 0));
			
		}
	}


	protected void CheckMove()
	{
		if (currentVelocity != 0f)
		{
			Vector2 pos = transform.position;
			pos.x += currentVelocity;
			transform.position = pos;
		}
	}





}
