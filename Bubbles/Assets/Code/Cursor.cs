using UnityEngine;
using System.Collections;

public class Cursor : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () 
	{
		if (Input.GetMouseButton(0))
		{
			MoveToTouch();
		}
	}

	protected void MoveToTouch()
	{
		Vector3 pos = Camera.main.ScreenToWorldPoint (Input.mousePosition);
//		pos.y = pos.y + 20f;
		pos.z = 0;
		transform.localPosition = pos;


	}
}
