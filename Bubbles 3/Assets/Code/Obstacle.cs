using UnityEngine;
using System.Collections;

public abstract class Obstacle : MonoBehaviour {


	// Use this for initialization
	void Awake()
	{

	}
	void Start ()
	{
	}

	void Update()
	{
	}
	
	void OnTriggerEnter2D (Collider2D coll)
	{
		OnHit( coll );
	}

	protected abstract void OnHit( Collider2D coll);
	
	protected void DestroySelf ()
	{
		Destroy (gameObject);
	}
}
