﻿using UnityEngine;
using System.Collections;

public class Player : MonoBehaviour {

	[SerializeField]
	protected GameManager gameManager;

	[SerializeField]
	protected float horizSpeed;
	protected string direction = "left";
	[SerializeField]
	protected float dampen = 5.0f;

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
		ReduceVelocity();
//		CheckMove();
	}

	protected void CheckStop()
	{
		//at left
		if (transform.position.x <= Camera.main.ScreenToWorldPoint(new Vector3(0,0,1)).x && direction == "left")
		{
			currentVelocity = 0f;
		}
		else if (transform.position.x >= Camera.main.ScreenToWorldPoint(new Vector3(Screen.width,0,1)).x && direction == "right")
		{
			currentVelocity = 0f;
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
		if (direction == "left")
		{
			direction = "right";
			GetComponent<Rigidbody2D>().velocity = new Vector3 (0,0,0);
			GetComponent<Rigidbody2D>().AddForce (new Vector3 (1000, 0, 0));
			currentVelocity = horizSpeed;
		}
		else if (direction == "right")
		{
			direction = "left";
			GetComponent<Rigidbody2D>().velocity = new Vector3 (0,0,0);
			GetComponent<Rigidbody2D>().AddForce (new Vector3 (-1000, 0, 0));
			currentVelocity = -horizSpeed;
		}
	}

	protected void DropMine()
	{
		GameObject bubble = Instantiate (gameManager.obstaclePrefab);
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
