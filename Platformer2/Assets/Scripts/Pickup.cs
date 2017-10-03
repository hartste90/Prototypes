using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Pickup : MonoBehaviour 
{
    public enum PickupType
    {
        Consumable = 0,
        HiddenOnPickup,
        ShowOnPickup,
    }

    public PickupType type = PickupType.Consumable;

    public string id = "item";

    protected bool wasPickedUp;

    public bool isConsumable
    {
        get
        {
            return type == PickupType.Consumable;
        }
    }

    public virtual void PickUp( PickupGetter getter )
    {
        if( wasPickedUp )
        {
            return;
        }

        wasPickedUp = true;
        getter.PickUp( this );

        if( type == PickupType.Consumable )
        {
            Destroy( gameObject );
        } 
        else
        {
            if( type == PickupType.HiddenOnPickup )
            {
                Destroy( GetComponentInChildren<SpriteRenderer>() );
            }

            Destroy( GetComponent<Collider2D>() );
            Destroy( GetComponent<Rigidbody2D>() );

            transform.parent = getter.transform;
            transform.localPosition = Vector3.zero;
        }
    }

    public virtual void OnTriggerEnter2D( Collider2D other )
    {
        DoCollision( other );
    }

    public virtual void OnTriggerStay2D( Collider2D other )
    {
        DoCollision( other );
    }

    protected virtual void DoCollision( Collider2D other )
    {
        PickupGetter getter = other.GetComponent< PickupGetter >();
        if( getter != null )
        {
            PickUp( getter );
        }
    }
	
}
