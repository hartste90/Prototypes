using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class MenuController : MonoBehaviour {

	public Text lastRecordText;


	// Use this for initialization
	void Start () {
		lastRecordText.text = PlayerPrefs.GetInt ("bestScore", 0).ToString ();
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
