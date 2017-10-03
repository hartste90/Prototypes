using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Mover : MonoBehaviour 
{
    public float acceleration = 50.0f;

    public float maximumSpeed = 20.0f;

    public float minimumWalkSpeed = 0.01f;

    public float aerialAcceleration = 10.0f;

    protected GroundDetector groundDetector;

    public Animator animator;

    public void Start()
    {
        groundDetector = GetComponent< GroundDetector >();    
    }

    public void Update()
    {
        if( animator != null )
        {
            animator.SetBool( "walking", IsWalking() );
        }
    }

    public void AccelerateInDirection( Vector2 direction )
    {
        float accel = acceleration;
        if( !groundDetector.isOnGround )
        {
            accel = aerialAcceleration;
        }

        Rigidbody2D rb = GetComponent< Rigidbody2D >();
        Vector2 newVelocity = rb.velocity + direction * accel * Time.deltaTime;

        newVelocity.x = Mathf.Clamp( newVelocity.x, -maximumSpeed, maximumSpeed );
        rb.velocity = newVelocity;
    }
	
    public bool IsWalking()
    {
        return Mathf.Abs( GetComponent<Rigidbody2D>().velocity.x ) >= minimumWalkSpeed;
    }
}
