using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;

public class UIManager : MonoBehaviour
{	
	public static UIManager instance = null;              
         
	protected int score = 0;
	protected int count = 0;
	protected float currentTime = 0;

	protected float MAXTIME = 30f;


	[SerializeField]
	protected Text scoreText;
	[SerializeField]
	protected Text countText;
	[SerializeField]
	public Image currentColorImage;
	[SerializeField]
	protected TimerView timerView;
	[SerializeField]
	public GameObject bubblePopEffectPrefab;

		
	//--------------------
	
	void Awake()
	{
		//check instance of GameManager
		if (instance == null) {
			instance = this;
		}
		else if (instance != this) {
			Destroy (gameObject);    
		}
		DontDestroyOnLoad(gameObject);
	}
	
	// Use this for initialization
	void Start () 
	{
		scoreText.text = "0";
		currentTime = MAXTIME;
	}

	void Update ()
	{
		currentTime -= Time.deltaTime;
		timerView.SetClock(currentTime, MAXTIME);
	}
	
	public void SetCurrentColor( Color newColor )
	{
		currentColorImage.color = newColor;
	}

	public void IncreaseScore ( int deltaScore )
	{
		score += deltaScore;
		RefreshScoreText();
	}
	public void DecreaseScore ( int deltaScore )
	{
		score -= deltaScore;
		currentTime -= 0.5f;

		RefreshScoreText();
	}

	public void AddTime ( float deltaTime )
	{
		if (currentTime < MAXTIME)
		{
			currentTime += deltaTime;
		}
	}
	public void SubtractTime ( float deltaTime )
	{
		if (currentTime > 0)
		{
			currentTime -= deltaTime;
		}
	}


	public void CheckGameOver()
	{
		//count coins
		int coinNum = GameObject.FindGameObjectsWithTag("Coin").Length;
		Debug.Log(coinNum);
		if (coinNum == 1)
		{
			Debug.Log("WINNER - YOU GOT ALL THE COINS!");
		}
	}

	protected void RefreshScoreText()
	{
		scoreText.text = score.ToString();
	}

	public void IncreaseCount (int deltaCount )
	{
		count += deltaCount;
		countText.text = count.ToString();
	}

	public void ResetCount ()
	{
		count = 0;
		countText.text = count.ToString();
	}

	public Color GetCurrentColor()
	{
		return currentColorImage.color;
	}

	public int GetCount()
	{
		return count;
	}

}
