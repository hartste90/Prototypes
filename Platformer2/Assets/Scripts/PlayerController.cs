using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour 
{	
    public Mover controlledMover;

    public Jumper controlledJumper;

	// Update is called once per frame
	void Update () 
    {
        controlledMover.AccelerateInDirection( new Vector2( Input.GetAxis( "Horizontal" ), 0.0f ) );

        if( Input.GetButtonDown( "Jump" ) )
        {
            controlledJumper.Jump();
        }
	}
}
