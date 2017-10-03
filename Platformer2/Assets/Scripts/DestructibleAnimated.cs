using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DestructibleAnimated : Destructible 
{
    protected bool shouldBeDestroyed = false;

    public void MarkReadyForDestroy()
    {
        shouldBeDestroyed = true;
    }
	
	// Update is called once per frame
	void Update () 
    {
        if( isDying && shouldBeDestroyed )
        {
            Destroy( gameObject );
        }
	}

    public override void Die()
    {
        if( isDying )
        {
            return;
        }

        Animator animator = GetComponent< Animator >();
        if( animator == null )
        {
            base.Die();
        } 
        else
        {
            isDying = true;
            animator.SetBool( "death", true );
        }
    }
}
