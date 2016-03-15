﻿using UnityEngine;
using System.Collections;

public class Bubble : MonoBehaviour 
{

	public SpriteRenderer bubble;

	[SerializeField]
	protected GameObject bubblePopEffect;
	// Use this for initialization
	void Start () 
	{
	
	}
	
	// Update is called once per frame
	void Update ()
	{
	
	}

	public void OnMouseUp()
	{
		Debug.Log ("Clicked bubble");
	}

	public void OnMouseOver()
	{

		UIManager.instance.ChangeCurrentColor(bubble.color);

		UIManager.instance.IncreaseScore (100);
		Instantiate (UIManager.instance.bubblePopEffectPrefab, transform.position, Quaternion.identity);

		Destroy (gameObject);
	}



}
