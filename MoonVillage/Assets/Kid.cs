using UnityEngine;
using System.Collections;

public class Kid : MonoBehaviour {


	protected Rigidbody2D kid;
	// Use this for initialization
	void Start ()
	{
		kid = GetComponent<Rigidbody2D>();
		InvokeRepeating("Jump", 2,  Random.Range(2f, 4F));

	}
	
	// Update is called once per frame
	void Update () {
	}

	void Jump() {
		kid.AddForce(new Vector2(0f, 400f));
	}
}
