using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;

public class UIManager : MonoBehaviour
{	
	public static UIManager instance = null;              
         
	protected int score = 0;
	protected int count = 0;


	[SerializeField]
	protected Text scoreText;
	[SerializeField]
	protected Text countText;
	[SerializeField]
	public Image currentColorImage;
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
		RefreshScoreText();
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
