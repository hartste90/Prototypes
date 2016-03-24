Shader "Custom/Shrub" {
	Properties {
		_Color ("Color", Color) = (1,1,1,1)
		_MainTex ("Albedo (RGB)", 2D) = "white" {}
		_Glossiness ("Smoothness", Range(0,1)) = 0.5
		_Metallic ("Metallic", Range(0,1)) = 0.0
		
		_Cutoff ("Shadow alpha cutoff", Range (0,1)) = 0.5
		_RedMask ("Red Mask", 2D) = "white" {}
		_RedStrength ("Red Strength", Range(-100,100)) = 1
		GreenMask ("Green Mask", 2D) = "white" {}
		_GreenStrength ("Green Strength", Range(-100,100)) = 1
		BlueMask ("Blue Mask", 2D) = "white" {}
		_BlueStrength ("Blue Strength", Range(-100,100)) = 1
		_Speed ("Speed", Range (1,100)) = 20
		_Amplifier ("Amplifier", Range (-20,20)) = 1

	}
	SubShader {
		Tags { "IgnoreProjector"="True" "RenderType"="TransparentCutout"}
		LOD 200 // Level Of Detail
		CULL Off
		CGPROGRAM
		// Physically based Standard lighting model, and enable shadows on all light types
		#pragma surface surf Standard fullforwardshadows alphatest:_Cutoff addshadow vertex:vert

		// Use shader model 3.0 target, to get nicer looking lighting
		#pragma target 3.0

		sampler2D _MainTex;

		struct Input {
			float2 uv_MainTex;
		};

		half _Glossiness;
		half _Metallic;
		fixed4 _Color;
		
		sampler2D _RedMask; //
		sampler2D _GreenMask; 
		sampler2D _BlueMask;

		float _RedStrength;
		float _GreenStrength;
		float _BlueStrength;

		float _Speed;
		float _Amplifier;
		
		
		void vert ( inout appdata_full v )
		{
		
			float twoPi = 2 * 3.141592653;
			float2 uv = v.texcoord.xy;
			uv.x = 1 - uv.x;
			uv.y = 1 - uv.y;
			

			fixed4 redValue = tex2D ( _RedMask, uv);
			fixed4 greenValue = tex2D ( _GreenMask, uv);
			fixed4 blueValue = tex2D ( _BlueMask, uv);

			float sinValue = sin(( _Time.x ) * _Speed) * _Amplifier;
//			float sinValue = sin(( _Time.x + redValue.y * twoPi ) * _Speed) * _Amplifier;

			v.vertex.z += sinValue * redValue.x * _RedStrength;
			v.vertex.y += sinValue * greenValue.y * _GreenStrength;
			v.vertex.x += sinValue * blueValue.z * _BlueStrength;

			
		}

		void surf (Input IN, inout SurfaceOutputStandard o) {
			// Albedo comes from a texture tinted by color
			fixed4 c = tex2D (_MainTex, IN.uv_MainTex) * _Color;
			o.Albedo = c.rgb;
			// Metallic and smoothness come from slider variables
			o.Metallic = _Metallic;
			o.Smoothness = _Glossiness;
			o.Alpha = c.a;
		}
		ENDCG
	} 
	FallBack "Diffuse"
}
