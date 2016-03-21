using UnityEngine;
using System.Collections;

public class Cursor : MonoBehaviour {


	public GameObject projectile;
	public AudioClip shootSound;
	
	
	private float throwSpeed = 2000f;
	private AudioSource source;
	private float volLowRange = .5f;
	private float volHighRange = 1.0f;

	
	public SpriteRenderer bubble;
	
	[SerializeField]
	protected GameObject bubblePopEffect;


	// Use this for initialization
	void Start () {
		source = GetComponent<AudioSource>();

	}
	
	// Update is called once per frame
	void Update () 
	{
		if (Input.GetMouseButton(0))
		{
			MoveToTouch();
		}
	}

	protected void MoveToTouch()
	{
		Vector3 pos = Camera.main.ScreenToWorldPoint (Input.mousePosition);
//		pos.y = pos.y + 20f;
		pos.z = 0;
		transform.localPosition = pos;


	}
	source.PlayOneShot(shootSound,vol);

	protected void OnCursorTouch ()
	{
		GameObject effect = Instantiate (UIManager.instance.bubblePopEffectPrefab, transform.position, Quaternion.identity) as GameObject;
		effect.GetComponent<ParticleSystem>().startColor = bubble.color;
		if (UIManager.instance.GetCurrentColor() == bubble.color)
		{
			UIManager.instance.IncreaseScore (100);
			UIManager.instance.AddTime(1.0f);
		}
		else
		{
			UIManager.instance.DecreaseScore(200);
			UIManager.instance.SetCurrentColor(bubble.color);
			UIManager.instance.ResetCount();
			UIManager.instance.SubtractTime(.5f);
		}
		
		UIManager.instance.IncreaseCount (1);
		if ( UIManager.instance.GetCount() >= 5 )
		{
			UIManager.instance.ResetCount();
			UIManager.instance.IncreaseScore (500);
		}
		
		Destroy (gameObject);
	}

	void OnCollisionEnter2D(Collision2D coll)
	{
		if (coll.gameObject.tag == "Cursor")
		{
			OnCursorTouch();
		}
	}

}
