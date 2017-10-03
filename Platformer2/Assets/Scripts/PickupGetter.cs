using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PickupGetter : MonoBehaviour 
{
    protected List<Pickup> pickups;

    public virtual void Awake()
    {
        pickups = new List<Pickup>();
    }
	
    public virtual void PickUp( Pickup pickup )
    {
        if( !pickup.isConsumable )
        {
            pickups.Add( pickup );
        }
    }

    public virtual int FindPickupCount( string pickupId )
    {
        int count = 0;
        for( int pickupIndex = 0; pickupIndex < pickups.Count; pickupIndex++ )
        {
            if( pickups[ pickupIndex ].id == pickupId )
            {
                count++;
            }
        }

        return count;
    }
}
