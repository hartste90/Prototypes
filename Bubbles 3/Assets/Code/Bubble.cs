using UnityEngine;
using System.Collections;

public class Bubble : MonoBehaviour 
{

	public SpriteRenderer image;

	[SerializeField]
	protected GameObject bubblePopEffect;
	// Use this for initialization
	void Awake () 
	{
	}
	
	// Update is called once per frame
	void Update ()
	{
	
	}

	void OnTriggerEnter2D(Collider2D coll) 
	{
		if (coll.gameObject.tag == "Boundary")
		{
			Destroy(gameObject);
		}
		if (coll.gameObject.tag == "Bubble")
		{
			Debug.Log("MOVING");
			transform.position = GetRandomPosition();
		}
	}

	public Vector3 GetRandomPosition ()
	{
		Vector3 screenPosition =
			Camera.main.ScreenToWorldPoint(new Vector3(Random.Range(0,Screen.width), 
			                                           (Screen.height), 
			                                           Camera.main.farClipPlane/2));
		return screenPosition;
		
	}










}
