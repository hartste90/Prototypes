using UnityEngine;
using System.Collections;

public class GameManager : MonoBehaviour
{
	[SerializeField]
	protected GameObject bubbleGeneratorPrefab;
	[SerializeField]
	protected float fallSpeed = 1.0f;


	protected GameObject bubbleGenerator;

	// Use this for initialization
	void Start () 
	{
		bubbleGenerator = Instantiate( bubbleGeneratorPrefab );
	}
	
	// Update is called once per frame
	void Update ()
	{
	
	}


}
