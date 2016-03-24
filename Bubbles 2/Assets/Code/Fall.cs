using UnityEngine;
using System.Collections;

public class Fall : MonoBehaviour 
{

	// Use this for initialization
	void Start ()
	{
	
	}
	
	// Update is called once per frame
	void Update () 
	{
		Vector2 newPos = new Vector2( transform.position.x, transform.position.y - GameMaster.fallSpeed );
		gameObject.transform.position = newPos;
	}
}
