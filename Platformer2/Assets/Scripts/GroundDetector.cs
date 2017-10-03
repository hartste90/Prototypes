using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GroundDetector : MonoBehaviour 
{
    public LayerMask onGroundLayerMask;

    protected List< Collider2D > colliders;

    public bool isOnGround
    {
        protected set { }
        get { return colliders.Count > 0; }
    }

    public void Start()
    {
        colliders = new List< Collider2D >();

        isOnGround = false;

        BoxCollider2D myCollider = GetComponent< BoxCollider2D >();
        collisionRadiusY = myCollider.size.y / 2.0f;
        colliderCenter = myCollider.offset;
    }

    public float collisionRadiusY
    {
        get;
        protected set;
    }

    public Vector2 colliderCenter
    {
        get;
        protected set;
    }

    public void OnCollisionEnter2D( Collision2D collision )
    {
        if( ( ( 1 << collision.collider.gameObject.layer ) ^ onGroundLayerMask.value ) == 0 )
        {
            for( int i = 0; i < collision.contacts.Length; i++ )
            {
                ContactPoint2D contactPoint = collision.contacts[ i ];
                float tempX = Mathf.Abs( contactPoint.normal.x - Vector2.up.x );
                float tempY = Mathf.Abs( contactPoint.normal.y - Vector2.up.y );
                if( tempX > 0.01f || tempY > 0.01f )
                {
                    continue;
                }

                colliders.Add( collision.collider );
                break;
            }
        }
    }

    public void OnCollisionExit2D( Collision2D collision )
    {
        if( ( ( 1 << collision.collider.gameObject.layer ) ^ onGroundLayerMask.value ) == 0 )
        {
            colliders.Remove( collision.collider );
        }
    }
}
