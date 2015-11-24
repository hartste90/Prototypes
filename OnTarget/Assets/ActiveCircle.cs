﻿using UnityEngine;
using System.Collections;

public class ActiveCircle : MonoBehaviour {

	public float growRate;

	protected bool isGrowing;
	protected Vector3 originalScale;

	// Use this for initialization
	void Start () {
		isGrowing = true;
		originalScale = transform.localScale;
	}
	
	// Update is called once per frame
	void Update () {

		if (isGrowing) 
		{
			//grow the circle
			transform.localScale = new Vector3 (
		                                    transform.localScale.x + growRate,
		                                    transform.localScale.y + growRate,
		                                    transform.localScale.z);
		}
		//freeze on mouse down
		if (Input.GetMouseButtonDown (0)) 
		{
			Debug.Log ("Pressed left click. Freezing.");
			isGrowing = false;
		}

	
	}

	public void ResetSize ()
	{
		transform.localScale = originalScale;
	}

	public void OnTriggerEnter2D ( Collider2D coll )
	{
		if ( coll.gameObject.tag == "Screen Edge" )
		{
			ResetSize ();
		}
	}

}
