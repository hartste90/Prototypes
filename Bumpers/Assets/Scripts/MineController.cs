using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class MineController : MonoBehaviour {

	public GameObject explosionPrefab;
	public Text countDownLabel;
	public int countDownNumber = 3;


	public Animator animator;
	// Use this for initialization
	void Start()
	{
	        animator = GetComponentInChildren <Animator>();
		StartCoroutine( ActivateAfterSeconds (1));
	}

	IEnumerator ActivateAfterSeconds(int waitTime) 
	{
	        yield return new WaitForSeconds(waitTime);
	        GetComponent <CircleCollider2D>().enabled = true;
		UpdateCountdownLabel (countDownNumber);
		StartCoroutine (ReduceCountdown (1));
	}
	IEnumerator ReduceCountdown(int timerSpeed) 
	{
	        yield return new WaitForSeconds(timerSpeed);
		CountdownTick ();
		animator.SetTrigger ("CTA");
		if (countDownNumber <= 0)
		{
			DestroySelf ();
		}
		StartCoroutine (ReduceCountdown (1));
	}

	public void CountdownTick()
	{
	        countDownNumber --;
		UpdateCountdownLabel (countDownNumber);
	}

	public void UpdateCountdownLabel(int num)
	{
	        countDownLabel.text = num+"";
	}

	public void DestroySelf()
	{
	        GameObject explostionObject = Instantiate(explosionPrefab, transform.parent);
		explostionObject.transform.localScale = Vector3.one;
	        Destroy(gameObject);
	}

}
