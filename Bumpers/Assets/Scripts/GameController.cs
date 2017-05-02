using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameController : MonoBehaviour {

	public int userLevel;

	public int numStartingMines;
	public int numStartingBumpers; 
	public int numStartingCoins; 

	public PlayerController playerController;
	public GameObject playerObject;

	public float gameSpeed;
	public GameObject playerPrefab;
	public GameObject coinPrefab;
	public GameObject minePrefab;
	public GameObject bumperPrefab;

	protected List<GameObject> coinList;
	protected List<GameObject> bumperList;
	protected List<GameObject> mineList;

	public void Awake()
	{
		Tools.screenWidth = Screen.width;
		Tools.screenHeight = Screen.height;
	}


	void Start()
	{
		coinList = new List<GameObject> ();
		bumperList = new List<GameObject> ();
		mineList = new List<GameObject> ();
		//spawn starting coin
		SpawnMultiple(numStartingCoins, coinPrefab);
		//spawn starting mines
		SpawnMultiple(numStartingMines, minePrefab);
		//spawn starting bumpers
		SpawnMultiple(numStartingBumpers, bumperPrefab);
		playerObject = Instantiate (playerPrefab);
	        playerController = playerObject.GetComponent<PlayerController>();
	        playerController.Init (this);
	        playerController.rigidbody.velocity = Vector3.zero;	
		playerObject.transform.position = Vector3.zero;
	}

	void Update ()
	{
		if(Input.GetKeyDown ("space"))
	        {
			ResetScene();
	        }
	}

	public void ResetScene()
	{
		DestroyAllItemsOnscreen();
	        Start();
	}

	public void SpawnMultiple (int numToSpawn, GameObject gameObject)
	{
		for (int i = 0; i < numToSpawn; i++) 
		{
			SpawnGameObject (gameObject);

		}
	}

	public void SpawnGameObject (GameObject gameObject)
	{
		Vector3 screenPosition = (new Vector3(Random.Range(-15,15), 0, Random.Range(-15,15)));
		SpawnGameObjectAtPosition (gameObject, screenPosition);
	}

	public void SpawnGameObjectAtPosition (GameObject gameObject, Vector3 position)
	{
		GameObject obj = Instantiate(gameObject, position, Quaternion.identity);
		if (gameObject == coinPrefab) 
		{
			coinList.Add (obj);
		}
		else if (gameObject == minePrefab)
		{
		        mineList.Add (obj);
		}
		else if (gameObject == bumperPrefab)
		{
		        bumperList.Add (obj);
		}
	}

	public void CheckCoinsCollected(GameObject coin)
	{
	        coinList.Remove (coin);
	        Destroy(coin);
		if (coinList.Count == 0) 
		{
			Debug.Log ("Victory: collected final coin");
			CompleteLevel();
		}

	}

	public void CompleteLevel()
	{
		userLevel++;
		CreateCoinsForLevel(userLevel);
	}
	public void CreateCoinsForLevel(int level)
	{
		SpawnMultiple (level, coinPrefab);
	}

	public void DestroyAllItemsOnscreen()
	{
	        Debug.Log(coinList.Count);
		Debug.Log(bumperList.Count);
		Debug.Log(mineList.Count);
	        for (int i = coinList.Count-1; i >= 0; i-- )
	        {
			Destroy (coinList[i].gameObject);
	        }
		for (int i = bumperList.Count-1; i >= 0; i-- )
	        {
			Destroy (bumperList[i].gameObject);
	        }
		for (int i = mineList.Count-1; i >= 0; i-- )
	        {
			Destroy (mineList[i].gameObject);
	        }
		Destroy (playerObject);
	}


}
