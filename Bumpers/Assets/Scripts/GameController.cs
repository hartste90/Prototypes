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
	public GameObject bumperPrefab;

	protected List<GameObject> coinList;

	public void Awake()
	{
		Tools.screenWidth = Screen.width;
		Tools.screenHeight = Screen.height;
	}


	void Start()
	{
		coinList = new List<GameObject> ();
		//spawn starting coin
		SpawnMultiple(numStartingCoins, coinPrefab);
		//spawn starting mines
		SpawnMultiple(numStartingMines, minePrefab);
		//spawn starting bumpers
		SpawnMultiple(numStartingBumpers, bumperPrefab);
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
		GameObject obj = Instantiate(gameObject,screenPosition,Quaternion.identity);
		if (gameObject == coinPrefab) 
		{
			coinList.Add (obj);
		}
	}

	public void CheckCoinsCollected()
	{
		if (coinList.Count == 1) 
		{
			Debug.Log ("Victory: collected final coin");
		}

	}


}
