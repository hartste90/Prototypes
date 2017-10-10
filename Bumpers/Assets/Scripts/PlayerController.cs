using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class PlayerController : MonoBehaviour {

	public GameController gameController;
	public Vector3 direction = Vector3.zero;
	public GameObject explosionPrefab;
	public GameObject minePrefab;
	public Rigidbody2D rigidbody;
	protected CharacterController characterController;
	protected Vector2 startSwipePosition;

	protected Vector3 lastTouchVector;

	public bool dropsMines;


	void OnDrawGizmos() 
	{
	        if (lastTouchVector != Vector3.zero)
	        {
	                Gizmos.DrawLine (transform.position, lastTouchVector);
	        }
     }

	public void Init(GameController controller)
	{
	        this.gameController = controller;
	}

	// Use this for initialization
	void Start () {
	        direction = Vector3.zero;
	        rigidbody = GetComponent <Rigidbody2D>();
	        rigidbody.velocity =Vector3.zero;
	        characterController = GetComponent <CharacterController>();
	        lastTouchVector = Vector3.zero;
	        dropsMines = true;
	}
	
	// Update is called once per frame
	void Update () {
//		MoveInCurrentDirection();
		if (direction == Vector3.zero)
		{
		        rigidbody.velocity = direction;
		}

		DetermineTapDirection();
	}

	public void DetermineTapDirection()
	{
		Vector3 tempDirection = direction;
		Vector3 touchPosition = Vector3.zero;
		//mimic touch

		if (Input.touchCount > 0 && Input.GetTouch (0).phase == TouchPhase.Began) 
		{
			Vector2 touchPos = Input.GetTouch(0).position;
			Vector3 worldpos = Camera.main.ScreenToWorldPoint(touchPos); 
			touchPosition = new Vector3 (worldpos.x, worldpos.y, 0);
		} 

		if (Input.GetKeyDown ("left"))
		{
		        touchPosition = new Vector3 (-1000, 0, 0);
		}
		else if (Input.GetKeyDown ("right"))
		{
			touchPosition = new Vector3 (1000, 0, 0);
		}
		else if (Input.GetKeyDown ("up"))
		{
			touchPosition = new Vector3 (0, 1000, 0);
		}
		else if (Input.GetKeyDown ("down"))
		{
			touchPosition = new Vector3 (0, -1000, 0);
		}

		if (touchPosition != Vector3.zero)
		{
			Vector3 difference =  touchPosition - transform.position;
//		        difference.Normalize ();
		        lastTouchVector = touchPosition;
//		        Debug.Log ("Difference: " + difference);
			float xDiffMag = Mathf.Abs (touchPosition.x - transform.position.x);
			float yDiffMag = Mathf.Abs (touchPosition.y - transform.position.y);
			Vector3 deltaPosition = new Vector3 (touchPosition.x - transform.position.x, touchPosition.y - transform.position.y, transform.position.z);
//			Debug.Log("Delta Pos: "  + deltaPosition+ " XDiff: " + xDiffMag + " YDiff: " + yDiffMag);
			//HORIZONTAL CHANGE
			if (Mathf.Abs (difference.x) >= Mathf.Abs (difference.y)) 
			{
				if (difference.x > 0) 
				{
//					Debug.Log ("Tapping: RIGHT");
					tempDirection = Vector3.right;
				}
				else
				{
//					Debug.Log ("Tapping: LEFT");

					tempDirection = Vector3.left;
				}
			}
			//VERTICAL CHANGE
			else
			{
				if (difference.y > 0) 
				{
//					Debug.Log ("Tapping: UP");

					tempDirection = Vector3.up;
				}
				else
				{
//					Debug.Log ("Tapping: DOWN");

					tempDirection = Vector3.down;
				}
			}
				
			if(tempDirection != direction)
			{
				OnChangeDirection(tempDirection);
			}
		}


//
		
	}



	public void DetermineSwipeDirection ()
	{
		Vector3 tempDirection = direction;
		if (Input.touchCount > 0 && Input.GetTouch (0).phase == TouchPhase.Began) {
			startSwipePosition = Input.GetTouch (0).position;
		} else if (Input.touchCount > 0 && Input.GetTouch (0).phase == TouchPhase.Ended) {
			Vector2 deltaPosition = Input.GetTouch (0).position - startSwipePosition;
			if (deltaPosition.magnitude >= gameController.minimumSwipeDistance) {
				if (Mathf.Abs (deltaPosition.x) > Mathf.Abs (deltaPosition.y)) {
					if (deltaPosition.x > 0) 
					{
					        Debug.Log ("Swiping: RIGHT");
					        tempDirection = Vector3.right;
					}
					else
					{
						Debug.Log ("Swiping: LEFT");

					        tempDirection = Vector3.left;
					}
			        }
			        else
			        {
					if (deltaPosition.y > 0) 
					{
						Debug.Log ("Swiping: UP");

					        tempDirection = Vector3.up;
					}
					else
					{
						Debug.Log ("Swiping: DOWN");

					        tempDirection = Vector3.down;
					}
			        }
			}
			if(tempDirection != direction)
		        {
		                OnChangeDirection(tempDirection);
		        }
		}

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
			tempDirection = Vector3.up;
	        }
		else if (Input.GetKey ("down"))
	        {
			tempDirection = Vector3.down;
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
		rigidbody.velocity = direction * gameController.gameSpeed;
	}

	public void OnHitMine()
	{
		Instantiate (explosionPrefab, transform.position, Quaternion.identity);
		CreatePhysicalExplosion ();

		Time.timeScale = 0.7F;
		Destroy(gameObject);
	}

	public void CreatePhysicalExplosion()
	{
		Vector3 explosionPos = transform.position;
		Collider[] colliders = Physics.OverlapSphere(explosionPos, 100f);
		foreach (Collider hit in colliders)
		{
			Rigidbody rb = hit.GetComponent<Rigidbody>();

			if (rb != null)
				rb.AddExplosionForce(10f, explosionPos, 100f, 3.0F);
		}
	}
		


	public void OnHitBumper()
	{
	    Vector3 oppositeDirection = GetOppositeDirection(direction);
		SetDirection (oppositeDirection);
	}

	public void OnHitCoin(GameObject coin)
	{
		gameController.CheckCoinsCollected (coin);
	}

	public void OnTriggerEnter2D(Collider2D collider) 
	{
		if (collider.gameObject.tag == "Coin")
                {
                        OnHitCoin(collider.gameObject);
                }
        }
	public void OnCollisionEnter2D(Collision2D collision)
         {
		Debug.Log ("COllision: " + collision.gameObject.tag);
            if (collision.gameObject.tag == "Mine")
            {
					OnHitMine ();
            }
            else if (collision.gameObject.tag == "Explosion")
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
