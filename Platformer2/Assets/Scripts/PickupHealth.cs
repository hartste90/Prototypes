using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PickupHealth : Pickup 
{
    public int recoveryAmount = 1;

    public override void PickUp( PickupGetter getter )
    {
        Destructible destructible = getter.GetComponent< Destructible >();
        if( destructible != null )
        {
            destructible.RecoverHitPoints( recoveryAmount );
        }

        base.PickUp( getter );
    }
}
