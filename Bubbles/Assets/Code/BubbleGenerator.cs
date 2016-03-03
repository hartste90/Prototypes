using UnityEngine;
using System.Collections;

public class BubbleGenerator : MonoBehaviour 
{

	[SerializeField]
	protected GameObject bubblePrefab;
	[SerializeField]
	protected float spawnRate = 1.0f;

	protected float spawnTime;

	// Use this for initialization
	void Start () 
	{
		spawnTime = Time.time;
	}
	
	// Update is called once per frame
	void Update () 
	{
		if ( Time.time - spawnTime > spawnRate ) 
		{
			spawnTime = Time.time;
			Debug.Log ("Spawning bubble");
			Instantiate( bubblePrefab );
		 }
	
	}
}
