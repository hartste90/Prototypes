using UnityEngine;
using System.Collections;

public abstract class Obstacle : MonoBehaviour {

	[SerializeField]
	public Transform upperBoundary;
	protected float startHeight;

	// Use this for initialization
	void Awake()
	{
	}
	void Start ()
	{
		startHeight = upperBoundary.position.y;
		Debug.Log("Startheight: " + startHeight);

	}
	
	void OnTriggerEnter2D (Collider2D coll)
	{
		if ( coll.gameObject.tag == "Boundary - Lower")
		{
			OnHitBoundary();
		}
		else
		{
			OnCollide( coll );
		}
	}

	protected abstract void OnCollide( Collider2D coll);
	
	protected void DestroySelf ()
	{
		Destroy (gameObject);
	}

	protected void ResetPosition ()
	{
		Vector3 pos = transform.position;
		pos.y = startHeight;
		transform.position = pos;
	}

	protected void OnHitBoundary ()
	{
		ResetPosition();
	}



}
