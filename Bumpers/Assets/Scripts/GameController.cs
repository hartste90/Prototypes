using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using UnityEngine.Experimental.Director;

public class GameController : MonoBehaviour {

	public int userLevel;
	public Transform gameStageParent;
	public UIController uiController;
	public EndgameScreenController endgameScreenController;

	public int numStartingMines;
	public int numStartingBumpers; 
	public int numStartingCoins; 

	public float minimumSwipeDistance;

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

		endgameScreenController.gameObject.SetActive (false);
		userLevel = 1;
		coinList = new List<GameObject> ();
		bumperList = new List<GameObject> ();
		mineList = new List<GameObject> ();
		//spawn starting coin
		SpawnMultiple(numStartingCoins, coinPrefab);
		//spawn starting mines
		SpawnMultiple(numStartingMines, minePrefab);
		//spawn starting bumpers
		SpawnMultiple(numStartingBumpers, bumperPrefab);
		playerObject = Instantiate (playerPrefab, gameStageParent);
		playerObject.transform.localScale = new Vector3(384, 384, 1);
		playerObject.transform.localPosition = Vector3.zero;
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
		Time.timeScale = 1.0f;
		SceneManager.LoadScene (SceneManager.GetActiveScene ().name);
//	        uiController.ResetUI();
//		DestroyAllItemsOnscreen();
//	        Start();
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
		Vector3 screenPosition = GetRandomLocationOnscreen ();
		SpawnGameObjectAtPosition (gameObject, screenPosition);
	}

	public static Vector3 GetRandomLocationOnscreen ()
	{
		Vector2 topRightCorner = new Vector2 (1, 1);
		Vector2 edgeVector = Camera.main.ViewportToWorldPoint (topRightCorner);
		float halfheight = edgeVector.y;
		float halfwidth = edgeVector.x;
		Vector3 position = new Vector3 (Random.Range (-halfwidth, halfwidth), Random.Range (-halfheight, halfheight * .9f), 0);
		return position;

	}

	public void SpawnGameObjectAtPosition (GameObject gameObject, Vector3 position)
	{
		GameObject obj = Instantiate(gameObject, position, Quaternion.identity, gameStageParent);
		obj.transform.localScale = new Vector3(384, 384, 1);
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
	        uiController.AddCoinsCollected(1);
	        coinList.Remove (coin);
	        Destroy(coin);
		if (coinList.Count == 0) 
		{
//			Debug.Log ("Victory: collected final coin");
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

	public void handlePlayerDestroyed()
	{
	        uiController.PauseTimer ();

	        PlayerPrefs.SetInt ("lastScore", userLevel);
	        if (PlayerPrefs.GetInt ("bestScore") < userLevel)
	        {
	                PlayerPrefs.SetInt ("bestScore", userLevel);
	        }
		StartCoroutine (ShowEndgameScreenAfterSeconds (1));
	}

	IEnumerator ShowEndgameScreenAfterSeconds (int waitTime) 
	{
	        yield return new WaitForSeconds(waitTime);
	        endgameScreenController.populateEndgameScreenContent (uiController.coinCountUILabel.text, uiController.timerUILabel.text);
		endgameScreenController.gameObject.SetActive (true);
	}


}
