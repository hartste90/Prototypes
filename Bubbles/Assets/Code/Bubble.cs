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

	void OnCollisionEnter2D(Collision2D coll)
	{
		if (coll.gameObject.tag == "Boundary")
		{
			Destroy(gameObject);
		}
	}










}
