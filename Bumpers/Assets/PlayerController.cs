using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour {

	public Vector3 direction = Vector3.forward;
	public CharacterController characterController;

	// Use this for initialization
	void Start () {
	        characterController = GetComponent <CharacterController>();
	}
	
	// Update is called once per frame
	void Update () {
		MoveInCurrentDirection();
	}

	public void MoveInCurrentDirection()
	{
//		characterController.Move((transform.rotation * motion) * Time.deltaTime);

	}
}
