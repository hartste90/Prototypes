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
		InvokeRepeating("MoveInCurrentDirection", 0.0f, 1f);
	}

	protected override void OnCollide( Collider2D coll)
	{
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
