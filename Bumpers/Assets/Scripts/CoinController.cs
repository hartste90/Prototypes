using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CoinController : MonoBehaviour {

	void OnCollisionEnter2D(Collision2D collider) 
	{
//	        Debug.Log("Coin ENTER: " + collider.gameObject.tag);
		if (collider.gameObject.tag == "Player") {
			return;
		} 
		else 
		{
			MoveToUnoccupiedSpace ();
		}
	}

	void OnTriggerStay2D(Collider2D collider) 
	{
//	        Debug.Log("Coin STAY: " + collider.gameObject.tag);
		if (collider.gameObject.tag == "Player") {
			return;
		} 
		else 
		{
			MoveToUnoccupiedSpace ();
		}
	}
	public void MoveToUnoccupiedSpace()
	{
		Debug.Log ("Moved to new location");
		transform.position = GameController.GetRandomLocationOnscreen ();
	}

	void FixedUpdate()
	{
	        if (transform.position.x <= -Screen.width/2
	        || transform.position.x >= Screen.width/2
	        || transform.position.y <= -Screen.height/2
	        || transform.position.y >= Screen.height/2)
	        {
	                Debug.Log ("Turning around: " + transform.position.ToString ());
			GetComponent<Rigidbody2D>().velocity = GetComponent<Rigidbody2D>().velocity * -1;
	        }
	}

}
