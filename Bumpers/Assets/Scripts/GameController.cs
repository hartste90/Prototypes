using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameController : MonoBehaviour {

	public int numStartingMines;
	public int numStartingBumpers; 
	public int numStartingCoins; 

	public float gameSpeed;
	public GameObject coinPrefab;
	public GameObject minePrefab;

	public void Awake()
	{
		Tools.screenWidth = Screen.width;
		Tools.screenHeight = Screen.height;
	}


	void Start()
	{
		//spawn starting coin
		SpawnMultiple(1, coinPrefab);
		//spawn starting mines
		SpawnMultiple(5, minePrefab);
	}

	public void SpawnMultiple (int numToSpawn, GameObject gameObject)
	{
		for (int i = 0; i < numToSpawn; i++) 
		{
			Debug.Log (i);
			SpawnGameObject (gameObject);
		}
	}

	public void SpawnGameObject (GameObject gameObject)
	{
		Vector3 screenPosition = (new Vector3(Random.Range(-15,15), 0, Random.Range(-15,15)));
		Instantiate(gameObject,screenPosition,Quaternion.identity);
	}

}
