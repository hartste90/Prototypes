using UnityEngine;
using System.Collections;

public class LowerBoundary : MonoBehaviour {

	[SerializeField]
	protected Transform upperBoundary;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnTriggerEnter2D ( Collider2D coll )
	{
		if ( coll.gameObject.tag == "Obstacle")
		{
			ResetPosition(coll.transform);
		}
	}

	protected void ResetPosition ( Transform obj )
	{
		Vector3 pos = obj.position;
		pos.y = upperBoundary.position.y;
		obj.position = pos;
	}
	

}
