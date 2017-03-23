using UnityEngine;
using System.Collections;
using System.Collections.Generic;       //Allows us to use Lists. 
	
public class GameManager : MonoBehaviour
{	
	public static GameManager instance = null;              

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
		//display where 
		Start here
	}
	


}