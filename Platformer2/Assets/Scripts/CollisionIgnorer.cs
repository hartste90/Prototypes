using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Linq;

public class CollisionIgnorer : MonoBehaviour 
{
    public BoxCollider2D trigger;
    public BoxCollider2D physicsCollider;

    public void OnTriggerEnter2D( Collider2D collider )
    {
        if( AreYouCollidingWithMyTrigger( collider ) )
        {
            Physics2D.IgnoreCollision( physicsCollider, collider, true );
            SetSortingLayer( "Background" );
        }
    }

    public void OnTriggerExit2D( Collider2D collider )
    {
        if( !AreYouCollidingWithMyTrigger( collider ) )
        {
            Physics2D.IgnoreCollision( physicsCollider, collider, false );
            SetSortingLayer( "Foreground" );
        }
    }

    public bool AreYouCollidingWithMyTrigger( Collider2D collider )
    {
        Collider2D[] contacts = new Collider2D[ 5 ];
        collider.GetContacts( contacts );
        return contacts.Contains( trigger );
    }

    public void SetSortingLayer( string sortingLayerName )
    {
        SpriteRenderer[] spriteRenderers = GetComponentsInChildren< SpriteRenderer >();
        for( int i = 0; i < spriteRenderers.Length; i++ )
        {
            SpriteRenderer spriteRenderer = spriteRenderers[ i ];
            spriteRenderer.sortingLayerName = sortingLayerName;
        }
    }
}
