using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using System.Collections.Generic;

public class Spinner: MonoBehaviour {

	//how fast the spinner turns (in degrees/frame)
	public float speed;
	//how far the spinner is currently turned
	public float rotation;
	//is the spinner rotating now?
	public bool isSpinning;

	void Start () 
	{
		rotation = 0f;
	}

	void Update () 
	{
		if (isSpinning) {

			transform.Rotate (Vector3.back, speed);
			rotation += speed;	
			if(rotation >= 360f)
			{
				rotation = 0f;
			}
		}

	}



}
