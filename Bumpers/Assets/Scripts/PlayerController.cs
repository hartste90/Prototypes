﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour {

	public GameController gameController;
	public Vector3 direction = Vector3.forward;
	protected CharacterController characterController;

	// Use this for initialization
	void Start () {
	        characterController = GetComponent <CharacterController>();
	}
	
	// Update is called once per frame
	void Update () {
		MoveInCurrentDirection();
		DetermineDirectionChange();
	}

	public void MoveInCurrentDirection()
	{
	        characterController.Move (direction * gameController.gameSpeed);
//		characterController.Move((transform.rotation * motion) * Time.deltaTime);

	}

	public void DetermineDirectionChange()
	{
//	Debug.Log (Input.GetAxis ("Vertical"));
//		Debug.Log (Input.GetAxis ("Horizontal"));
//
	        if(Input.GetKey ("left"))
	        {
	                direction = Vector3.left;
	        }
		else if(Input.GetKey ("right"))
	        {
	                direction = Vector3.right;
	        }
		else if(Input.GetKey ("up"))
	        {
	                direction = Vector3.forward;
	        }
		else if (Input.GetKey ("down"))
	        {
	                direction = Vector3.back;
	        }
	}
}
