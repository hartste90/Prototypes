using UnityEngine;
using System.Collections;

public class FollowPlayer : MonoBehaviour {

	public Transform player;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		Vector3 pos = new Vector3(0,0, -5);
		pos.x = player.position.x + 2f;
		transform.position = pos;
	
	}
}
