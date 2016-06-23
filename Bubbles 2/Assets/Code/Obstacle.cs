using UnityEngine;
using System.Collections;

public abstract class Obstacle : MonoBehaviour {

	[SerializeField]
	public Transform upperBoundary;
	protected float startHeight;
	protected float activeTime;

	// Use this for initialization
	void Awake()
	{
		activeTime = 0f;
	}
	void Start ()
	{
		startHeight = upperBoundary.position.y;

	}

	void Update()
	{
		activeTime += Time.deltaTime;
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
		GameObject effect = Instantiate (UIManager.instance.bubblePopEffectPrefab, transform.position, Quaternion.identity) as GameObject;
		effect.GetComponent<ParticleSystem>().startColor = GetComponent<SpriteRenderer>().color;
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
