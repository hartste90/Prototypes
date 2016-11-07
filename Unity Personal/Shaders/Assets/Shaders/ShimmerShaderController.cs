using UnityEngine;
using System.Collections;

public class ShimmerShaderController : MonoBehaviour {

	private Renderer rend;

	public float objectHeight;
	// Use this for initialization
	void Start () {
		rend = GetComponent<Renderer>();
		rend.sharedMaterial.SetFloat("_ObjHeight", objectHeight);

	}

	// Update is called once per frame
	void Update () {

	}
}
