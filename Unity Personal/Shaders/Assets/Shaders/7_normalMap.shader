// Upgrade NOTE: replaced '_Object2World' with 'unity_ObjectToWorld'
// Upgrade NOTE: replaced '_World2Object' with 'unity_WorldToObject'

Shader "Steve/tut/7 - Normal" 
{
	Properties
	{
		_Color ("Color", Color) = (1.0, 1.0, 1.0, 1.0)
		_MainTex ("Diffuse Texture", 2D) = "white" {}
		_BumpMap ("Normal Texture", 2D) = "bump" {}
		_BumpDepth ("Bump Depth", Range( -10.0, 10.0 ) ) = 1
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
			#pragma exclude_renderers flash
			
			
			sampler2D _MainTex;
			float4 _MainTex_ST;
			sampler2D _BumpMap;
			float4 _BumpMap_ST;
			//user dfined vars
			float4 _Color;
			float4 _SpecColor;
			float4 _RimColor;
			float _Shininess;
			float _RimPower;
			float _BumpDepth;

			//Unity defined variables
			
			float4 _LightColor0;
			
			//base input structs
			struct vertexInput
			{
				float4 vertex : POSITION;
				float3 normal : NORMAL;
				float4 texcoord : TEXCOORD0;
				float4 tangent : TANGENT;
			};
			
			struct vertexOutput
			{
				float4 pos : SV_POSITION;
				float4 tex : TEXCOORD0;
				float4 posWorld : TEXCOORD1;
				float3 normalWorld : TEXCOORD2;
				float3 tangentWorld : TEXCOORD3;
				float3 binormalWorld : TEXCOORD4;
			};
			
			
			//vertext function
			vertexOutput vert (vertexInput v)
			{
				vertexOutput o;
				
				o.normalWorld = normalize( mul( float4( v.normal, 0.0), unity_WorldToObject).xyz);
				o.tangentWorld = normalize( mul( unity_ObjectToWorld, v.tangent).xyz );
				o.binormalWorld = normalize( cross (o.normalWorld, o.tangentWorld) * v.tangent.w );
				
				o.posWorld = mul(unity_ObjectToWorld, v.vertex);
				o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
				o.tex = v.texcoord;
				return o;
			}
			
			
			//fragment function
			float4 frag(vertexOutput i) : COLOR
			{
				//vectors
				float3 viewDirection = normalize( _WorldSpaceCameraPos.xyz - i.posWorld.xyz);
				float atten;
				float3 lightDirection;
				
				if (_WorldSpaceLightPos0.w == 0.0)
				{
					atten = 1.0;
					lightDirection = normalize( _WorldSpaceLightPos0.xyz);
				}
				else
				{
					float3 fragmentToLightSource = _WorldSpaceLightPos0.xyz - i.posWorld.xyz;
					float distance = length (fragmentToLightSource);
					atten = 1/distance;
					lightDirection = normalize (fragmentToLightSource);
				}
				
				
				//Texture maps
				float4 tex = tex2D (_MainTex, i.tex.xy * _MainTex_ST.xy + _MainTex_ST.zw);
				float4 texN = tex2D (_BumpMap, i.tex.xy * _BumpMap_ST.xy + _BumpMap_ST.zw);

				//unpackNormal function
				float3 localCoords = float3( 2.0 * texN.ag - float2 (1.0, 1.0), 0.0);
				localCoords.z = _BumpDepth;//1.0 - 0.5 * dot (localCoords, localCoords);
				
				//normal transpose matrix
				float3x3 local2WorldTranspose = float3x3 (
					i.tangentWorld,
					i.binormalWorld,
					i.normalWorld
				);
				
				//calculate normal direction
				float3 normalDirection = normalize (mul( localCoords, local2WorldTranspose) );
				
				float3 diffuseReflection = atten * _LightColor0.xyz * saturate( dot( normalDirection, lightDirection));
				float3 specularReflection = diffuseReflection * _SpecColor.xyz * pow( saturate ( dot ( reflect ( -lightDirection, normalDirection), viewDirection)), _Shininess);
				
				//rim lighting
				float3 rim = 1 - saturate ( dot (viewDirection, normalDirection));
				float3 rimLighting = saturate( dot( normalDirection, lightDirection ) * _RimColor.xyz * _LightColor0.xyz * pow ( rim, _RimPower) );// * _LightColor0.xyz * _RimColor * saturate (dot (normalDirection, lightDirection)) * pow(rim, _RimPower) ;
				
				float3 lightFinal = rimLighting + diffuseReflection + specularReflection + UNITY_LIGHTMODEL_AMBIENT.xyz;


				
				return float4( tex.xyz * lightFinal * _Color.xyz, 1.0) ;
				
			}
			
			ENDCG
		}
		
	}
	
	//fallback commented out during development
	//Fallback "Diffuse"
	
}