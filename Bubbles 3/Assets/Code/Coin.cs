using UnityEngine;
using System.Collections;

public class Coin : Obstacle 
{

	protected override void OnCollide( Collider2D coll)
	{
		if ( coll.gameObject.tag == "Player")
		{
			OnHitPlayer( coll.gameObject );
		}
	}

	protected void OnHitPlayer( GameObject player)
	{
		UIManager.instance.IncreaseCount(1);
		UIManager.instance.CheckGameOver();
		DestroySelf();
	}


}
