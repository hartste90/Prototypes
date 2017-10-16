using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class MenuController : MonoBehaviour {



	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}

	public void handlePlayButtonPressed()
	{
		Initiate.Fade("MainGame",Color.black,5f);
//		SceneManager.LoadScene ("MainGame");

	}
}
