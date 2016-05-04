using UnityEngine;
using System.Collections;

public class PlayerController : MonoBehaviour {

	protected Rigidbody2D rigidbody;

	public float JUMP_FORCE = 100f;
	// Use this for initialization
	void Start () {
		rigidbody = GetComponent<Rigidbody2D>();
		rigidbody.AddForce(new Vector2(400f,0f));
	
	}
	
	// Update is called once per frame
	void Update () {

		if (Input.GetMouseButtonDown(0))
		{
			Debug.Log("Pressed left click.");
			rigidbody.AddForce(new Vector2 (0f, JUMP_FORCE));
		}
	}

	void OnMouseDown()
	{
		Debug.Log("JUPMIN");
	}
}
