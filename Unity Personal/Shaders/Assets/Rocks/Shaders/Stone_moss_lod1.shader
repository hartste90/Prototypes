// Upgrade NOTE: replaced '_Object2World' with 'unity_ObjectToWorld'

Shader "Custom/Stone_moss_lod1" {
Properties {
	  _MainBumpMap ("Main Bumpmap", 2D) = "bump" {}
	  
	  _SpecColor ("Specular Color", Color) = (0.5, 0.5, 0.5, 1)
      _Shininess ("Shininess", Range (0.01, 1)) = 0.078125
      
      _StoneColor ("Stone Color", Color) = (1,1,1,1)
      _StoneTex ("Stone (RGB) Height (A)", 2D) = "white" {}
      
      _CoverColor ("Cover Color", Color) = (1,1,1,1)
      _CoverTex ("Cover Tile(RGB) Height (A)", 2D) = "white" {}
      
      _CoverCover ("CoverLevel", Range (-2, 2)) = 0
      
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
        float2 uv_RegulatorTex;   
        float3 worldPos;  
        float3 viewDir;     
    };
      
    sampler2D _StoneTex;
    sampler2D _CoverTex;
    sampler2D _MainBumpMap;
    sampler2D _RegulatorTex;
    fixed4 _StoneColor;
    fixed4 _CoverColor;
    float _CoverCover;
    half _Shininess;

void surf (Input IN, inout SurfaceOutput o) {
    
    half4 Detail0 = tex2D (_StoneTex, IN.uv_StoneTex)* _StoneColor;
	half4 Detail1 = tex2D (_CoverTex, IN.uv_CoverTex)* _CoverColor;
    
    float4 wPos = mul(unity_ObjectToWorld, float4(0,0,0,1));
    
    half4 RegulatorTex = tex2D (_RegulatorTex, IN.uv_RegulatorTex);
    half4 MaskGrad = tex2D (_RegulatorTex, ((IN.worldPos.xy - wPos.y + 22) / 40));
	
	half4 HeightSplatTex1 = Detail0.a;
	half4 HeightSplatTex2 = Detail1.a + _CoverCover;
	
	float a0 = MaskGrad.g;
	float a1 = MaskGrad.r;
	
	float ma = (max(HeightSplatTex1.rgb + a0, HeightSplatTex2.rgb + a1)) - 0.01;

	float b0 = max(HeightSplatTex1.rgb + a0 - ma, 0);
	float b1 = max(HeightSplatTex2.rgb + a1 - ma, 0);

	fixed4 tex = (Detail0 * b0 + Detail1 * b1) / (b0 + b1);

	tex = tex;
    o.Albedo.rgb = tex.rgb;
    
    o.Gloss = tex.a;
	o.Alpha = tex.a;
	o.Specular = _Shininess;

	o.Normal = (UnpackNormal(tex2D(_MainBumpMap, IN.uv_MainBumpMap)));
    }
    ENDCG
    } 
    Fallback "Diffuse"
}