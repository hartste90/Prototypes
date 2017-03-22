using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class TimerView : MonoBehaviour {
	
	[SerializeField]
	protected Image clock;
	// Use this for initialization
	void Start () {
		clock = transform.GetComponent<Image>();
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void SetClock (float currentTime, float maxTime)
	{
		clock.fillAmount = (currentTime / maxTime) / 2;
	}
}
