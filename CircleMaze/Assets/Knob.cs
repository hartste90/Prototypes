using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using System.Collections.Generic;

public class Knob : MonoBehaviour {

	public RectTransform ring;

	public float speed;

	protected Ray2D ray;

	// Use this for initialization
	void Start () {
	
		transform.localPosition = new Vector2 (ring.sizeDelta.x / 2, 0f);

		Vector3 worldPos = Camera.main.WorldToScreenPoint (transform.position);
//		RaycastHit hit;
//		ray = Camera.main.ScreenPointToRay (worldPos);
//		Debug.Log (transform.localPosition);
//		if (Physics.Raycast(ray, out hit, 99999999f)) {
//			Transform objectHit = hit.transform;
//			Debug.Log("Hit: " + hit.transform.gameObject.name);
//			// Do something with the object that was hit by the raycast.
//		}
//		Debug.DrawRay(ray.origin, ray.direction,Color.red, 99999999fa);
	}


	
	// Update is called once per frame
	void Update () {
//		Debug.Log (Input.mousePosition);
		transform.RotateAround (ring.transform.position, Vector3.forward, speed);

		RaycastHit2D hit;
		ray = Camera.main.ScreenPointToRay (Input.mousePosition);
//		Debug.Log (transform.localPosition);
		if (Physics2D.Raycast(ray, out hit, 99999999f)) {
			Transform objectHit = hit.transform;
			Debug.Log("Hit: " + hit.transform.gameObject.name);
			// Do something with the object that was hit by the raycast.
		}
		Debug.DrawRay(ray.origin, ray.direction,Color.red, 99999999f);

	
	}
}
