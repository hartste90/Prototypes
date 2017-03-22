using UnityEngine;
using System.Collections;

public class Mine : Obstacle 
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
		if (activeTime > 3)
		{
			player.GetComponent<Player>().ChangeDirection();
			Debug.Log ("Mine Hit");
			DestroySelf();
			Application.LoadLevel("GameOver");
		}

	}


}
