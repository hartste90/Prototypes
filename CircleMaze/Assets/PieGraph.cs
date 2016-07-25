using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class PieGraph : MonoBehaviour {

	[SerializeField]
	protected float[] amounts;
	[SerializeField]
	protected Color[] colors;
	[SerializeField]
	protected Image wedgePrefab;

	// Use this for initialization
	void Start () {
	
		MakeGraph ();
	}

	protected void MakeGraph()
	{
		float total = 0f;
		float zRotation = 0f;
		foreach (float value in amounts) 
		{
			total += value;
		}
		for (int i = 0; i < amounts.Length; i++)
		{
			Image newWedge = Instantiate(wedgePrefab) as Image;
			newWedge.transform.SetParent (transform, false);
			newWedge.color = colors[i];
			newWedge.fillAmount = amounts[i] / total;
			newWedge.transform.rotation = Quaternion.Euler( new Vector3 (0f, 0f, zRotation));
			zRotation -= newWedge.fillAmount * 360f;
		}

	}


}
