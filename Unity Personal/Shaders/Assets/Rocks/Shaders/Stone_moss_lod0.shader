// Upgrade NOTE: replaced '_Object2World' with 'unity_ObjectToWorld'

Shader "Custom/Stone_moss_lod0" {
Properties {
	  _MainBumpMap ("Main Bumpmap", 2D) = "bump" {}
	  
	  _SpecColor ("Specular Color", Color) = (0.5, 0.5, 0.5, 1)
      _Shininess ("Shininess", Range (0.01, 1)) = 0.078125
      
      _StoneColor ("Stone Color", Color) = (1,1,1,1)
      _StoneTex ("Stone (RGB) Height (A)", 2D) = "white" {}
      _StoneBumpMap ("Tile Bumpmap", 2D) = "bump" {}
      
      _CoverColor ("Cover Color", Color) = (1,1,1,1)
      _CoverTex ("Cover Tile(RGB) Height (A)", 2D) = "white" {}
      _CoverBumpMap ("Cover Bumpmap", 2D) = "bump" {}
      
      _Parallax ("CoverParallaxHeight", Range (0.000, 0.08)) = 0.02
      _MossCover ("CoverLevel", Range (-2, 2)) = 0
      _CoverSmooth ("CoverSmooth", Range (0.01, 1)) = 0.01
      
      _RegulatorTex ("RegulatorTex (RG)", 2D) = "white" {}
    }
    SubShader {
    Tags { "RenderType"="Opaque" }
    LOD 400
      
    CGPROGRAM
    #pragma surface surf BlinnPhong
    #pragma target 3.0
      
    struct Input {
        float2 uv_StoneTex;
        float2 uv_CoverTex;
        float2 uv_MainBumpMap;
        float2 uv_StoneBumpMap;  
        float2 uv_CoverBumpMap;
        float2 uv_RegulatorTex;   
        float3 worldPos;  
        float3 viewDir;     
    };
      
    sampler2D _StoneTex;
    sampler2D _CoverTex;
    sampler2D _MainBumpMap;
    sampler2D _StoneBumpMap;
    sampler2D _CoverBumpMap;
    sampler2D _RegulatorTex;
    fixed4 _StoneColor;
    fixed4 _CoverColor;
    float _Parallax;
    float _MossCover;
    half _Shininess;
    half _CoverSmooth;

void surf (Input IN, inout SurfaceOutput o) {

	half4 h = tex2D (_CoverTex, IN.uv_CoverTex).a;
	float2 offset = ParallaxOffset (h, _Parallax, IN.viewDir);
	IN.uv_CoverTex += offset;
    
    half4 Detail0 = tex2D (_StoneTex, IN.uv_StoneTex)* _StoneColor;
	half4 Detail1 = tex2D (_CoverTex, IN.uv_CoverTex)* _CoverColor;
    
    float4 wPos = mul(unity_ObjectToWorld, float4(0,0,0,1));
    
    half4 RegulatorTex = tex2D (_RegulatorTex, IN.uv_RegulatorTex);
    half4 MaskGrad = tex2D (_RegulatorTex, ((IN.worldPos.xy - 0 + 22) / 40));
	
	half4 HeightSplatTex1 = Detail0.a;
	half4 HeightSplatTex2 = Detail1.a + _MossCover;
	
	float a0 = MaskGrad.g;
	float a1 = MaskGrad.r;
	
	float ma = (max(HeightSplatTex1.rgb + a0, HeightSplatTex2.rgb + a1)) - _CoverSmooth;

	float b0 = max(HeightSplatTex1.rgb + a0 - ma, 0);
	float b1 = max(HeightSplatTex2.rgb + a1 - ma, 0);

	fixed4 tex = (Detail0 * b0 + Detail1 * b1) / (b0 + b1);

	tex = tex;
    o.Albedo.rgb = tex.rgb;
    
	float4 NormTexture0 = (tex2D(_MainBumpMap, IN.uv_MainBumpMap) + (tex2D(_StoneBumpMap, IN.uv_StoneBumpMap))-0.5);
	float4 NormTexture1 = (tex2D(_MainBumpMap, IN.uv_MainBumpMap) + (tex2D(_CoverBumpMap, IN.uv_CoverBumpMap))-0.5);
	
	float4 mixnormal = (NormTexture0 * b0 + NormTexture1 * b1) / (b0 + b1);
          
    o.Gloss = tex.a;
	o.Alpha = tex.a;
	o.Specular = _Shininess;

	o.Normal = (UnpackNormal(mixnormal));
    }
    ENDCG
    } 
    Fallback "Diffuse"
}