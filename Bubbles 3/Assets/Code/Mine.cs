using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;

public enum MineTypes
{
	None,
	Still,
	Bounce
}

public class Mine : Obstacle 
{


	void Start() {
	}

	protected override void OnHit( Collider2D coll)
	{
		Debug.Log ("Mine hit something");
		if ( coll.gameObject.tag == "Player")
		{
			OnHitPlayer( coll.gameObject );
		}
	}
	
	protected void OnHitPlayer( GameObject player)
	{
		Debug.Log ("Mine Hit");
		SceneManager.LoadScene("Bubbles");
	}


}
