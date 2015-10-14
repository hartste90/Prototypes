import UnityEngine.UI;
/**
Obstacle:
Any item that reacts to a bullet hit

**/

public class Target extends Obstacle
{
	
	public var innerSprite : SpriteRenderer;
	public var outterSprite : SpriteRenderer;
	
	function Untint ()
	{
		super.Untint();
		transform.FindChild("inner_target").GetComponent(SpriteRenderer).color = original_color;

	}
	
	function Tint ()
	{
		super.Tint();
		transform.FindChild("inner_target").GetComponent(SpriteRenderer).color = new Color(.9,.9,.9,.85); 
	}
	

	function ApplyDamage ( damage: float )
	{
		super.ApplyDamage(damage);
		if (health <= 0)
		{
			innerSprite.enabled = false;
			outterSprite.enabled = false;
		}
	}
}
