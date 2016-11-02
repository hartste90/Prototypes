using UnityEngine;
using System.Collections;

public class Rotate : MonoBehaviour {

	public float speed = .1f;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
		transform.Rotate(new Vector3 ( .45f + Mathf.Sin(Time.deltaTime), .45f, 0), speed);
	}
}
