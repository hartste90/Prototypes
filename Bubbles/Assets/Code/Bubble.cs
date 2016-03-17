using UnityEngine;
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

		GameObject effect = Instantiate (UIManager.instance.bubblePopEffectPrefab, transform.position, Quaternion.identity) as GameObject;
		effect.GetComponent<ParticleSystem>().startColor = bubble.color;
		if (UIManager.instance.GetCurrentColor() == bubble.color)
		{
			UIManager.instance.IncreaseScore (100);
		}
		else
		{
			UIManager.instance.DecreaseScore(200);
			UIManager.instance.SetCurrentColor(bubble.color);
			UIManager.instance.ResetCount();
		}

		UIManager.instance.IncreaseCount (1);
		if ( UIManager.instance.GetCount() >= 5 )
		{
			UIManager.instance.ResetCount();
			UIManager.instance.IncreaseScore (500);
		}

		Destroy (gameObject);
	}

	void OnCollisionEnter2D(Collision2D coll)
	{
		if (coll.gameObject.tag == "Boundary")
		{
			Destroy(gameObject);
		}
	}





}
