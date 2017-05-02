using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor.VersionControl;
using System.CodeDom.Compiler;

public class PlayerController : MonoBehaviour {

	public GameController gameController;
	public Vector3 direction = Vector3.zero;
	public GameObject explosionPrefab;
	public GameObject minePrefab;
	public Rigidbody rigidbody;
	protected CharacterController characterController;


	public void Init(GameController controller)
	{
	        this.gameController = controller;
	}

	// Use this for initialization
	void Start () {
	        direction = Vector3.zero;
	        rigidbody = GetComponent <Rigidbody>();
	        rigidbody.velocity =Vector3.zero;
	        characterController = GetComponent <CharacterController>();
	}
	
	// Update is called once per frame
	void Update () {
//		MoveInCurrentDirection();
		if (direction == Vector3.zero)
		{
		        rigidbody.velocity = direction;
		}
		DetermineDirectionChange();
	}

	public void MoveInCurrentDirection()
	{
	        characterController. Move (direction * gameController.gameSpeed);

	}

	public void DetermineDirectionChange()
	{
//	Debug.Log (Input.GetAxis ("Vertical"));
//		Debug.Log (Input.GetAxis ("Horizontal"));
//
		Vector3 tempDirection = direction;
	        if(Input.GetKey ("left"))
	        {
			tempDirection = Vector3.left;
	        }
		else if(Input.GetKey ("right"))
	        {
			tempDirection = Vector3.right;
	        }
		else if(Input.GetKey ("up"))
	        {
			tempDirection = Vector3.forward;
	        }
		else if (Input.GetKey ("down"))
	        {
			tempDirection = Vector3.back;
	        }

	        if(tempDirection != direction)
	        {
	                OnChangeDirection(tempDirection);
	        }
	}

	protected void OnChangeDirection( Vector3 tempDirection)
	{
		gameController.SpawnGameObjectAtPosition (minePrefab, transform.position);
		SetDirection (tempDirection);

	}
	protected void SetDirection (Vector3 tempDirection )
	{
		direction = tempDirection;
	       rigidbody.velocity = direction * 10;
	}

	public void OnHitMine()
	{
		Instantiate (explosionPrefab, transform.position, Quaternion.identity);
		Destroy(gameObject);
	}


	public void OnHitBumper()
	{
	        Vector3 oppositeDirection = GetOppositeDirection(direction);
		SetDirection (oppositeDirection);
	}

	public void OnHitCoin(GameObject coin)
	{
		Destroy(coin);
		gameController.CheckCoinsCollected ();
	}

	public void OnTriggerEnter(Collider collider) 
	{
		if (collider.gameObject.tag == "Coin")
                {
                        OnHitCoin(collider.gameObject);
                }
        }
	public void OnCollisionEnter(Collision collision)
         {
                if (collision.gameObject.tag == "Mine")
                {
			OnHitMine ();
                }
                else if (collision.gameObject.tag == "Bumper")
                {
                        OnHitBumper();
                }

               
         }

	protected Vector3 GetOppositeDirection(Vector3 direction)
	{
	        if(direction == Vector3.forward)
	                return Vector3.back;
	       else if (direction == Vector3.back)
	                return Vector3.forward;
		else if (direction == Vector3.left)
	                return Vector3.right;
		else
	                return Vector3.left;

	}
}
