using UnityEngine;
using System.Collections;

public class Rotate : MonoBehaviour {

	public float xSpeed = 0f;
	public float ySpeed = .1f;
	public float zSpeed = 0f;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
//		transform.Rotate(new Vector3 ( .45f + Mathf.Sin(Time.deltaTime), .45f, 0), speed);
		transform.Rotate(new Vector3 (1, 0, 0), xSpeed);
		transform.Rotate(new Vector3 (0, 1, 0), ySpeed);
		transform.Rotate(new Vector3 (0, 0,1), zSpeed);


	}
}
