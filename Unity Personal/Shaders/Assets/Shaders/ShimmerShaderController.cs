using UnityEngine;
using System.Collections;

public class ShimmerShaderController : MonoBehaviour {

	private Renderer rend;

	public float noiseAmp = 1f;
	public Color color1;
	public Color color2;
	public Color color3;
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
		rend.sharedMaterial.SetColor ("_Color1", this.color1);
		rend.sharedMaterial.SetColor ("_Color2", this.color2);
		rend.sharedMaterial.SetColor ("_Color3", this.color3);

	}
}
