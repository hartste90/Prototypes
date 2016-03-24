using UnityEngine;
using System.Collections;

public class Player : MonoBehaviour {

	[SerializeField]
	protected GameObject obstaclePrefab;

	[SerializeField]
	protected float horizSpeed = 5f;
	protected string direction = "left";

	protected float currentVelocity = 0f;
	// Use this for initialization
	void Start () {
		Vector3 screenPos = Camera.main.ScreenToWorldPoint(new Vector3(0,Screen.height/4,1));
		transform.position = screenPos;
	
	}
	
	// Update is called once per frame
	void Update () 
	{
		CheckStop();
		CheckJump();
		CheckMove();



	}

	protected void CheckStop()
	{
		//at left
		if (transform.position.x <= Camera.main.ScreenToWorldPoint(new Vector3(0,0,1)).x)
		{
			currentVelocity = 0f;
		}
		else if (transform.position.x >= Camera.main.ScreenToWorldPoint(new Vector3(Screen.width,0,1)).x)
		{
			currentVelocity = 0f;
		}
	}

	protected void CheckJump()
	{
		if (Input.GetMouseButtonDown(0))
		{
			Jump();
		}
	}

	protected void Jump()
	{
		if (direction == "left")
		{
			direction = "right";
			currentVelocity = horizSpeed;
		}
		else if (direction == "right")
		{
			direction = "left";
			currentVelocity = -horizSpeed;
		}

		GameObject bubble = Instantiate (this.obstaclePrefab);
		bubble.transform.position = transform.position;

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
