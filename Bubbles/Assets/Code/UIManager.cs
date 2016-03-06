using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;

public class UIManager : MonoBehaviour
{	
	public static UIManager instance = null;              
         
	protected int score = 0;

	[SerializeField]
	protected Text scoreText;
	[SerializeField]
	protected Image currentColorImage;
		
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
	
	public void ChangeCurrentColor( Color newColor )
	{
		currentColorImage.color = newColor;
	}

	public void IncreaseScore ( int deltaScore )
	{
		score += deltaScore;
		scoreText.text = score.ToString();
	}

}
