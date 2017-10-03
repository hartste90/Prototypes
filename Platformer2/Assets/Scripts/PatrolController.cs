using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PatrolController : MonoBehaviour 
{
    public Mover controllerMover;

    public float patrolTime = 1.0f;

    private float remainingPatrolTime;

    private float movementDirection;

    public bool jumpsAtEnd = false;

    public bool looksAhead = true;

    public float lookAheadDistance = 0.5f;

	// Use this for initialization
	void Start () {
        remainingPatrolTime = patrolTime;
        movementDirection = 1.0f;
	}
	
	// Update is called once per frame
	void Update () 
    {
        if( !MovingForwardIsSafe() )
        {
            remainingPatrolTime = 0.0f;
        }

        remainingPatrolTime -= Time.deltaTime;
        if( remainingPatrolTime > 0.0f )
        {
            controllerMover.AccelerateInDirection( new Vector2( movementDirection, 0.0f ) );
        } 
        else if( !controllerMover.IsWalking() )
        {
            movementDirection *= -1;
            remainingPatrolTime = patrolTime;

            if( jumpsAtEnd )
            {
                Jumper jumper = controllerMover.GetComponent< Jumper >();
                if( jumper != null )
                {
                    jumper.Jump();
                }
            }
        }
	}

    protected bool MovingForwardIsSafe()
    {
        if( !looksAhead )
        {
            return true;
        }

        Rigidbody2D rb = GetComponent< Rigidbody2D >();

        if( Mathf.Abs( rb.velocity.x ) <= 0.01f )
        {
            return true;
        }
        
        float directionNormal = rb.velocity.x / Mathf.Abs( rb.velocity.x );
        GroundDetector groundDetector = controllerMover.GetComponent< GroundDetector >();

        Vector2 lookAheadPos = lookAheadDistance * ( Vector2 )( transform.right * directionNormal );
        Vector2 origin = ( Vector2 ) transform.position + lookAheadPos + groundDetector.colliderCenter;

        Debug.DrawLine( origin, new Vector2( origin.x, origin.y - groundDetector.collisionRadiusY + 0.1f ), Color.red );

        return Physics2D.Raycast( origin, Vector2.down, groundDetector.collisionRadiusY + 0.1f, groundDetector.onGroundLayerMask );
    }
}
