using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Controller : MonoBehaviour {

	public GameObject borderItemPrefab;
	// Use this for initialization
	void Start () {
		//create grid of spaces on play area
		Debug.Log(Screen.width + ", " + Screen.height);

		Vector3 p = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width/2, Screen.height/2, Camera.main.nearClipPlane));

		Instantiate(borderItemPrefab, p, Quaternion.identity);
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
