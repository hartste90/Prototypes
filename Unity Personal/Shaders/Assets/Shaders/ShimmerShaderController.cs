using UnityEngine;
using System.Collections;

public class ShimmerShaderController : MonoBehaviour {

	private Renderer rend;

	public float noiseAmp = 1f;
	public Texture texture1;
	public Texture texture2;
	public Texture texture3;

	void Start () {
		rend = GetComponent<Renderer>();
		rend.sharedMaterial.SetFloat("_NoiseAmp", this.noiseAmp);
		rend.sharedMaterial.SetTexture("_HighTexture", this.texture1);
		rend.sharedMaterial.SetTexture("_MidTexture", this.texture2);
		rend.sharedMaterial.SetTexture("_LowTexture", this.texture3);
	}

	// Update is called once per frame
	void Update () {
		rend.sharedMaterial.SetFloat("_NoiseAmp", this.noiseAmp);


	}
}
