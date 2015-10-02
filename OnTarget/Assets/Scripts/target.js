import UnityEngine.UI;
/**
Obstacle:
Any item that reacts to a bullet hit

**/

public class Target extends Obstacle
{
	
	public var innerSprite : SpriteRenderer;
	public var outterSprite : SpriteRenderer;
	public var explosion : GameObject;
	
	function Untint ()
	{
		super.Untint();
		transform.FindChild("inner_target").GetComponent(SpriteRenderer).color = original_color;

	}
	

	function ApplyDamage ( damage: float )
	{
		super.ApplyDamage(damage);
		if (health <= 0)
		{
			Instantiate(explosion, transform.position, transform.rotation);
			innerSprite.enabled = false;
			outterSprite.enabled = false;

			GameObject.Find("Recap Menu").Find("Panel").Find("Next Level Button").GetComponent(Button).interactable = true;
		}
	}
}
