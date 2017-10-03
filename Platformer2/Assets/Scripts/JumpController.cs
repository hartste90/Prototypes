using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class JumpController : MonoBehaviour {

    public Jumper controlledJumper;

    public float jumpDelay = 1.0f;

    private float nextJumpTime;

	// Use this for initialization
	void Start () {
        nextJumpTime = Time.time;
	}
	
	// Update is called once per frame
	void Update () {
        if( Time.time >= nextJumpTime )
        {
            controlledJumper.Jump();
            nextJumpTime = Time.time + jumpDelay;
        }
	}
}
