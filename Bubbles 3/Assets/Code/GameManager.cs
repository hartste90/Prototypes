using UnityEngine;
using System.Collections;
using System.Collections.Generic;       //Allows us to use Lists. 
	
public class GameManager : MonoBehaviour
{	
	public static GameManager instance = null;  

	public float gameSpeed = 1f;

	public Player player;
	public GridSpace[][] gameBoard = new GridSpace[10][];


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
		//setup gameBoard
		SetupGameBoard();
	}

	public void SetupGameBoard()
	{
		gameBoard[0] = new GridSpace[10];
		gameBoard[1] = new GridSpace[10];
		gameBoard[2] = new GridSpace[10];
		gameBoard[3] = new GridSpace[10];
		gameBoard[4] = new GridSpace[10];
		gameBoard[5] = new GridSpace[10];
		gameBoard[6] = new GridSpace[10];
		gameBoard[7] = new GridSpace[10];
		gameBoard[8] = new GridSpace[10];
		gameBoard[9] = new GridSpace[10];
	}
	


}