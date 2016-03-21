﻿using UnityEngine;
using System.Collections;

public class BubbleGenerator : MonoBehaviour 
{

	[SerializeField]
	protected float minSize = 0.5f;
	[SerializeField]
	protected float maxSize = 2.0f;
	[SerializeField]
	protected Color[] colors;
	[SerializeField]
	protected GameObject bubblePrefab;
	[SerializeField]
	protected float spawnRate;
	[SerializeField]
	protected float screenEdgeBuffer = 20.0f;

	protected float spawnTime;

	// Use this for initialization
	void Start () 
	{
		spawnTime = Time.time;
	}
	
	// Update is called once per frame
	void Update () 
	{
		CheckSpawnBubble();
	}

	protected void CheckSpawnBubble()
	{
		if ( Time.time - this.spawnTime > this.spawnRate ) 
		{
			this.spawnTime = Time.time;
			SpawnBubble();
		}
	}

	protected void SpawnBubble()
	{
		GameObject bubble = Instantiate (this.bubblePrefab);
		float size = Random.Range(minSize, maxSize);
		bubble.transform.localScale = new Vector2 (size, size);
		bubble.GetComponent<Bubble> ().image.color = GetRandomColor ();
		bubble.transform.position = GetRandomPosition ();
	}


	protected Color GetRandomColor()
	{
		return this.colors[Random.Range(0, this.colors.Length)];
	}

	protected Vector3 GetRandomPosition ()
	{
		Vector3 screenPosition =
			Camera.main.ScreenToWorldPoint(new Vector3(Random.Range(0+this.screenEdgeBuffer,Screen.width-this.screenEdgeBuffer), 
			                                           (Screen.height + this.screenEdgeBuffer), 
			                                           Camera.main.farClipPlane/2));
		return screenPosition;

	}
}
