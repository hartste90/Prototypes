using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;

public class GamePanel : MonoBehaviour {

	[SerializeField]
	protected float[] amounts;
	[SerializeField]
	protected Color[] colors;
	public float[] offsets;
	[SerializeField]
	protected GameObject wedgePrefab;
	[SerializeField]
	public List<Image> wedgeList = new List<Image>();

	public float total;
	public Spinner spinner;
	public Button stopButton;

	// Use this for initialization
	void Start () 
	{
		wedgeList = new List<Image>();
		MakeGraph ();
		stopButton.onClick.AddListener(() => OnStopButtonPressed());
	}

	protected void MakeGraph()
	{
		offsets = new float[amounts.Length];
		float zRotation = 90f;
		for (int i = 0; i < amounts.Length; i++)
		{
			GameObject newWedge = Instantiate(wedgePrefab) as GameObject;
			newWedge.transform.SetParent (transform, false);
			Wedge wedgeController = newWedge.GetComponent<Wedge>();
			newWedge.color = colors[i];
			newWedge.fillAmount = amounts[i] / 100;
			newWedge.transform.rotation = Quaternion.Euler( new Vector3 (0f, 0f, -zRotation));

			wedgeList.Add(newWedge);
			zRotation += newWedge.fillAmount * 360f;
			offsets[i] = zRotation % 360f;
		}
	}

	protected void OnStopButtonPressed()
	{
		spinner.Activate();
		Debug.Log(CalculateSegment());
	}

	protected int CalculateSegment()
	{
		int index = -1;
		for (int i = 0; i < wedgeList.Count; i++)
		{
			Image wedge = wedgeList[i] as Image;
			if (offsets[i] <= spinner.rotation && spinner.rotation < (offsets[i]+(amounts[i]/total)) )
			{
				return i;
			}
		}
		return -1;
	}




}
