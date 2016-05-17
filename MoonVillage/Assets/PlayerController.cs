using UnityEngine;
using System.Collections;

public class PlayerController : MonoBehaviour {

	public AudioClip jump;
	public AudioClip succeed;
	public AudioClip fail;
	public AudioClip celebrate;

	public Transform upgradePos;

	protected Rigidbody2D rigidbody;
	protected AudioSource audio;


	public float JUMP_FORCE = 100f;
	// Use this for initialization
	void Start () {
		rigidbody = GetComponent<Rigidbody2D>();
		audio = GetComponent<AudioSource>();
//		rigidbody.AddForce(new Vector2(400f,0f));
	
	}
	
	// Update is called once per frame
	void Update () {

		if (Input.GetMouseButtonDown(0))
		{
			audio.clip = jump;
			audio.Play();
			if (transform.position.x <= 0)
			{
				rigidbody.AddForce(new Vector2 (400f, JUMP_FORCE));
			}
			else
			{
				rigidbody.AddForce(new Vector2 (1f, JUMP_FORCE));

			}

		}
		if (rigidbody.velocity.x < 0)
		{
			rigidbody.AddForce(new Vector2 (20f, 0f));

		}
	}

	void OnMouseDown()
	{
		Debug.Log("JUPMIN");
	}

	void OnTriggerEnter2D(Collider2D coll) 
	{
		if (coll.gameObject.tag == "Hat")
		{
			audio.clip = succeed;
			audio.Play();
			coll.transform.parent = upgradePos;
			coll.transform.localPosition = new Vector2 (0f, 0f);
			Destroy(coll.gameObject, 2f);
		}
	}

	void OnCollisionEnter2D(Collision2D coll) {

		if (coll.gameObject.tag == "Enemy")
		{
			audio.clip = fail;
			audio.Play();
			Application.LoadLevel(Application.loadedLevel);
		}
		else if (coll.gameObject.tag == "Bullet")
		{
			audio.clip = celebrate;
			audio.Play();
		}
	}
}
