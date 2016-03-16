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

		if (UIManager.GetCurrentColor() != bubble.color)
		{
			UIManager.instance.SetCurrentColor(bubble.color);
			UIManager.instance.ResetCount();
		}
		else
		{

		}


		UIManager.instance.IncreaseScore (100);


		UIManager.instance.IncreaseCount (1);

		Destroy (gameObject);
	}



}
