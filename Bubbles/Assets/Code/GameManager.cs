﻿using UnityEngine;
using System.Collections;

namespace Completed
{
	using System.Collections.Generic;       //Allows us to use Lists. 
	
	public class GameManager : MonoBehaviour
	{	
		public static GameManager instance = null;              

		[SerializeField]
		protected float SIZEMODIFIER = 1.1f;
		[SerializeField]
		protected GameObject bubbleGeneratorPrefab;
		[SerializeField]
		protected float fallSpeed = 1.0f;
		[SerializeField]

		protected Color currentColor;
		protected GameObject bubbleGenerator;                             
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
			bubbleGenerator = Instantiate( bubbleGeneratorPrefab );
		}
		
		
		public void ChangeCurrentColor( Color newColor )
		{
			this.currentColor = newColor;
		}
			
		
		//Update is called every frame.
		void Update()
		{
			
		}

		public void GrowOtherBubbles( Color Color )
		{

		}

		//increases the size of all objects passed in
		protected void IncreaseAllSizes( GameObject[] objects )
		{
			foreach (GameObject obj in objects )
			{
				IncreaseSize (obj);
			}
		}

		public void ResetSize()
		{
			gameObject.transform.localScale.Set(1,1,1);
		}
		
		public void IncreaseSize( GameObject obj )
		{
			float x = gameObject.transform.localScale.x * SIZEMODIFIER;
			float y = gameObject.transform.localScale.y * SIZEMODIFIER;
			gameObject.transform.localScale.Set(x, y, 1);
		}

	}
}