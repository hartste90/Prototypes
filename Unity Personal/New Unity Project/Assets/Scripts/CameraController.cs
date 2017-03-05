using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraController : MonoBehaviour {

	float speed = 1f;

	// Use this for initialization
	void Start () {
		
	}

	void Update ()
	{
		Vector3 position = this.transform.position;

		if (Input.GetKey(KeyCode.LeftArrow))
		{
			position.x--;
		}
		if (Input.GetKey(KeyCode.RightArrow))
		{
			position.x++;
		}
		if (Input.GetKey(KeyCode.UpArrow))
		{
			position.z++;
		}
		if (Input.GetKey(KeyCode.DownArrow))
		{
			position.z--;
		}
		this.transform.position = position;

	}


}
