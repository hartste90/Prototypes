using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Jumper : MonoBehaviour 
{
    public float jumpImpulse = 10.0f;

    public float jumpDelay = 0.5f;

    private float lastTimeJumped;

    private GroundDetector groundDetector;

    public Animator animator;

    public void Awake()
    {
        groundDetector = GetComponent< GroundDetector >();
    }

    public void Update()
    {
        if( animator != null )
        {
            animator.SetBool( "jumping", !groundDetector.isOnGround );
        }
    }

    public void Jump()
    {
        float timeSinceJumped = Time.time - lastTimeJumped;

        if( timeSinceJumped >= jumpDelay && groundDetector.isOnGround )
        {
            GetComponent<Rigidbody2D>().velocity = new Vector2( GetComponent<Rigidbody2D>().velocity.x, jumpImpulse );
            lastTimeJumped = Time.time;
        }
    }
}
