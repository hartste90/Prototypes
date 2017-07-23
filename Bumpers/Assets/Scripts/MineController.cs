using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MineController : MonoBehaviour {

	// Use this for initialization
	void Start()
	{
		StartCoroutine( ActivateAfterSeconds (1));
	}

	IEnumerator ActivateAfterSeconds(int waitTime) 
	{
	        yield return new WaitForSeconds(waitTime);
	        GetComponent <CircleCollider2D>().enabled = true;
	}
}
