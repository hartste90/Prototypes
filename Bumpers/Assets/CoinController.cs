using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CoinController : MonoBehaviour {

	void OnTriggerEnter(Collider collider) 
	{
		if (collider.tag == "Player") {
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

}
