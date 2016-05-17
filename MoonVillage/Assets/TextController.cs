using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;


public class TextController : MonoBehaviour {

	public Text text;
	public Transform player;
	public List<string> dialogue = new List<string>();
	public List<Transform> markers = new List<Transform>();

//	protected int dialogueIndex = 0;
	// Use this for initialization
	void Start () {
	
		dialogue.Add("Being a mom is one tough adventure ...");
		dialogue.Add("You've helped 3 kids move into dorms...");
		dialogue.Add("You've helped with countless homework assignments ...");
		dialogue.Add("And kissed away a million boo-boos ...");
		dialogue.Add("But that's why...");
		dialogue.Add("You're our HERO!");
	}
	
	// Update is called once per frame
	void Update () {
		if(player.position.x > markers[5].position.x)
		{
			ShowDialogue(5);
		}
		else if(player.position.x > markers[4].position.x)
		{
			ShowDialogue(4);
		}
		else if(player.position.x > markers[3].position.x)
		{
			ShowDialogue(3);
		}
		else if(player.position.x > markers[2].position.x)
		{
			ShowDialogue(2);
		}
		else if(player.position.x > markers[1].position.x)
		{
			ShowDialogue(1);
		}
		else if(player.position.x > markers[0].position.x)
		{
			ShowDialogue(0);
		}
	
	}

	public void ShowDialogue(int index)
	{
		text.text = dialogue[index];
	}


}
