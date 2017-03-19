using UnityEngine;
using System.Collections;

public abstract class Obstacle : MonoBehaviour {

	[SerializeField]
	public Transform upperBoundary;
	public bool doesShrink;
	protected float startHeight;
	protected float activeTime;
	protected float strength;

	// Use this for initialization
	void Awake()
	{
		activeTime = 0f;
	}
	void Start ()
	{
		upperBoundary = GameObject.FindGameObjectWithTag("Boundary - Upper").transform;
		startHeight = upperBoundary.position.y;
		if (gameObject.tag == "StrongObstacle")
		{
			strength = 9;
		}
		else
		{
			strength = 3;
		}

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
		if (doesShrink) 
		{
			ReduceStrength ();
		}
		ResetPosition();

	}

	protected void ReduceStrength()
	{
		strength --;
		if (strength <= 0)
		{
			Destroy(gameObject);
		}
		transform.localScale = new Vector2 (transform.localScale.x *.9f, transform.localScale.y *.9f );
	}



}
