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
	public Rigidbody2D rigidbody;
	protected CharacterController characterController;
	protected Vector2 startSwipePosition;


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
	}
	
	// Update is called once per frame
	void Update () {
//		MoveInCurrentDirection();
		if (direction == Vector3.zero)
		{
		        rigidbody.velocity = direction;
		}
#if UNITY_EDITOR
		DetermineDirectionChange();
#elif UNITY_ANDROID
//		DetermineSwipeDirection();
		DetermineTapDirection();
#endif
	}

	public void DetermineTapDirection()
	{
		Vector3 tempDirection = direction;
		Vector3 touchPosition = Vector3.zero;
		if (Input.touchCount > 0 && Input.GetTouch (0).phase == TouchPhase.Began) 
		{
			touchPosition = Input.GetTouch (0).position;
		} 

		//If backwards, reverse the minus variables
		Vector3 deltaPosition = new Vector3 (transform.position.x - touchPosition.x, transform.position.y - touchPosition.y, transform.position.z);
		if (Mathf.Abs (deltaPosition.x) > Mathf.Abs (deltaPosition.y)) 
		{
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
			
		if(tempDirection != direction)
		{
			OnChangeDirection(tempDirection);
		}
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
