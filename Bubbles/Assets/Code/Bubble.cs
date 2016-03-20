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

	void OnCollisionEnter2D(Collision2D coll)
	{
		if (coll.gameObject.tag == "Boundary")
		{
			Destroy(gameObject);
		}
		else if (coll.gameObject.tag == "Cursor")
		{
			OnCursorTouch();
		}
	}

	protected void OnCursorTouch ()
	{
		GameObject effect = Instantiate (UIManager.instance.bubblePopEffectPrefab, transform.position, Quaternion.identity) as GameObject;
		effect.GetComponent<ParticleSystem>().startColor = bubble.color;
		if (UIManager.instance.GetCurrentColor() == bubble.color)
		{
			UIManager.instance.IncreaseScore (100);
			UIManager.instance.AddTime(1.0f);
		}
		else
		{
			UIManager.instance.DecreaseScore(200);
			UIManager.instance.SetCurrentColor(bubble.color);
			UIManager.instance.ResetCount();
			UIManager.instance.SubtractTime(.5f);
		}
		
		UIManager.instance.IncreaseCount (1);
		if ( UIManager.instance.GetCount() >= 5 )
		{
			UIManager.instance.ResetCount();
			UIManager.instance.IncreaseScore (500);
		}
		
		Destroy (gameObject);
	}








}
