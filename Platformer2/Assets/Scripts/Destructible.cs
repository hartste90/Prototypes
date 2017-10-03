using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Destructible : MonoBehaviour 
{
    public int maximumHitPoints = 100;
    public float invincibilityTime = 0.5f;

    protected float lastTimeHurt;

    public virtual int hitPoints
    {
        get;
        protected set;
    }

    public virtual bool isDying
    {
        get;
        protected set;
    }

	// Use this for initialization
	void Start () {
		
        hitPoints = maximumHitPoints;

        lastTimeHurt = Time.time - invincibilityTime;
	}

    public virtual void TakeDamage( int amount )
    {
        ModifyHitPoints( -amount );
        lastTimeHurt = Time.time;
    }

    public virtual void RecoverHitPoints( int amount )
    {
        ModifyHitPoints( amount );
    }

    public virtual void ModifyHitPoints( int amount )
    {
        if( Time.time - lastTimeHurt < invincibilityTime && amount < 0 )
        {
            return;
        }

        hitPoints += amount;
        hitPoints = Mathf.Min( hitPoints, maximumHitPoints );

        if( hitPoints <= 0 )
        {
            Die();
        }
    }

    public virtual void Die()
    {
        if( isDying )
        {
            return;
        }

        isDying = true;
        Destroy( gameObject );
    }
}
