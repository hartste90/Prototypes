﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ExplosionPuffController : MonoBehaviour {

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}

	public void DestroySelf()
	{
		Destroy (gameObject);
	}
}
