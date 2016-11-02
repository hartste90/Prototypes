﻿// Upgrade NOTE: replaced '_Object2World' with 'unity_ObjectToWorld'
// Upgrade NOTE: replaced '_World2Object' with 'unity_WorldToObject'

Shader "Steve/tut/5a - Multiple Lights" 
{
	Properties
	{
		_Color ("Color", Color) = (1.0, 1.0, 1.0, 1.0)
		_SpecColor ("SpecularColor", Color) = (1.0, 1.0, 1.0, 1.0)
		_Shininess ("Shininess", Float) = 10
		_RimColor ("RimColor", Color) = (1.0, 1.0, 1.0, 1.0)
		_RimPower ("Rim Power", Range(0.1, 10.0)) = 3.0
	}	
	SubShader 
	{
		Pass
		{
			Tags { "LightMode" = "ForwardBase" }
			CGPROGRAM
			
			//pragmas
			#pragma vertex vert
			#pragma fragment frag
			
			//user dfined vars
			float4 _Color;
			float4 _SpecColor;
			float4 _RimColor;
			float _Shininess;
			float _RimPower;
			//Unity defined variables
			float4 _LightColor0;
			
			//base input structs
			struct vertexInput
			{
				float4 vertex : POSITION;
				float3 normal : NORMAL;
			};
			
			struct vertexOutput
			{
				float4 pos : SV_POSITION;
				float4 posWorld : TEXCOORD0;
				float3 normalDir : TEXCOORD1;


			};
			
			
			//vertext function
			vertexOutput vert (vertexInput v)
			{
				vertexOutput o;
				o.posWorld = mul(unity_ObjectToWorld, v.vertex);
				o.normalDir = normalize(mul(float4(v.normal, 0.0), unity_WorldToObject).xyz);
				o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
				return o;
				
				
			
			}
			
			
			//fragment function
			float4 frag(vertexOutput i) : COLOR
			{
				//vectors
				float3 normalDirection = i.normalDir;
				float3 viewDirection = normalize( _WorldSpaceCameraPos.xyz - i.posWorld.xyz);
				float3 lightDirection = normalize(_WorldSpaceLightPos0.xyz);
				float atten = 1.0;
				
				
				float3 diffuseReflection = atten * _LightColor0.xyz * saturate( dot( normalDirection, lightDirection));
				
				float3 specularReflection = atten * _LightColor0.xyz * saturate( dot( normalDirection, lightDirection)) * pow( saturate( dot ( reflect( - lightDirection, normalDirection), viewDirection) ), _Shininess);
				
				//rim lighting
				float3 rim = 1 - saturate ( dot( normalize (viewDirection), normalDirection));
				float3 rimLighting = atten * _LightColor0.xyz * _RimColor * saturate (dot (normalDirection, lightDirection)) * pow(rim, _RimPower) ;
				
				float3 lightFinal = rimLighting + diffuseReflection + specularReflection + UNITY_LIGHTMODEL_AMBIENT;

				return float4( lightFinal * _Color.rgb, 1.0);
				
			}
			
			ENDCG
		}
		
		Pass
		{
			Tags { "LightMode" = "ForwardAdd" }
			Blend One One
			CGPROGRAM
			
			//pragmas
			#pragma vertex vert
			#pragma fragment frag
			
			//user dfined vars
			float4 _Color;
			float4 _SpecColor;
			float4 _RimColor;
			float _Shininess;
			float _RimPower;
			//Unity defined variables
			float4 _LightColor0;
			
			//base input structs
			struct vertexInput
			{
				float4 vertex : POSITION;
				float3 normal : NORMAL;
			};
			
			struct vertexOutput
			{
				float4 pos : SV_POSITION;
				float4 posWorld : TEXCOORD0;
				float3 normalDir : TEXCOORD1;


			};
			
			
			//vertext function
			vertexOutput vert (vertexInput v)
			{
				vertexOutput o;
				o.posWorld = mul(unity_ObjectToWorld, v.vertex);
				o.normalDir = normalize(mul(float4(v.normal, 0.0), unity_WorldToObject).xyz);
				o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
				return o;
				
				
			
			}
			
			
			//fragment function
			float4 frag(vertexOutput i) : COLOR
			{
				//vectors
				float3 normalDirection = i.normalDir;
				float3 viewDirection = normalize( _WorldSpaceCameraPos.xyz - i.posWorld.xyz);
				float3 lightDirection = normalize(_WorldSpaceLightPos0.xyz);
				float atten = 1.0;
				
				
				float3 diffuseReflection = atten * _LightColor0.xyz * saturate( dot( normalDirection, lightDirection));
				
				float3 specularReflection = atten * _LightColor0.xyz * saturate( dot( normalDirection, lightDirection)) * pow( saturate( dot ( reflect( - lightDirection, normalDirection), viewDirection) ), _Shininess);
				
				//rim lighting
				float3 rim = 1 - saturate ( dot( normalize (viewDirection), normalDirection));
				float3 rimLighting = atten * _LightColor0.xyz * _RimColor * saturate (dot (normalDirection, lightDirection)) * pow(rim, _RimPower) ;
				
				float3 lightFinal = rimLighting + diffuseReflection + specularReflection;

				return float4( lightFinal * _Color.rgb, 1.0);
				
			}
			
			ENDCG
		}
		
	}
	
	//fallback commented out during development
	//Fallback "Diffuse"
	
}