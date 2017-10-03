using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpriteVelocityFlipper : MonoBehaviour 
{
    public bool defaultIsRightFacing = true;
    public SpriteRenderer spriteRenderer;
	
	// Update is called once per frame
	void Update () 
    {
        Rigidbody2D rb = GetComponent< Rigidbody2D >();
        if( rb.velocity.x == 0.0f )
        {
            return;
        }

        bool flip = rb.velocity.x < 0.0f;
        if( !defaultIsRightFacing )
        {
            flip = !flip;
        }

        spriteRenderer.flipX = flip;
	}
}
